/**
 * V1 Comprehensive Test Suite
 * Tests all 8 scenarios outlined for C8 verification
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000/api/v1';

// Helper: JSON request
function api(method, urlPath, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath.replace(/^\//, ''), BASE_URL + '/');
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Helper: Raw GET returning a buffer (for ZIP downloads)
function rawGet(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath.replace(/^\//, ''), BASE_URL + '/');
    http.get(url.href, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, buffer: Buffer.concat(chunks) }));
    }).on('error', reject);
  });
}

// Helper: Multipart upload (for restore)
function uploadZip(urlPath, filePath) {
  return new Promise((resolve, reject) => {
    const boundary = '----TestBoundary' + Date.now();
    const fileBuffer = fs.readFileSync(filePath);
    
    const prefix = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="backup"; filename="backup.zip"\r\nContent-Type: application/zip\r\n\r\n`
    );
    const suffix = Buffer.from(`\r\n--${boundary}--\r\n`);
    const payload = Buffer.concat([prefix, fileBuffer, suffix]);

    const url = new URL(urlPath.replace(/^\//, ''), BASE_URL + '/');
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': payload.length
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// Scoring
let passed = 0, failed = 0;
const OK = '  ✅';
const FAIL = '  ❌';
const INFO = '  ℹ️';

function check(label, condition) {
  if (condition) { console.log(`${OK} ${label}`); passed++; }
  else { console.log(`${FAIL} ${label}`); failed++; }
}

async function run() {
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('  V1 COMPREHENSIVE TEST SUITE — 8 SCENARIOS');
  console.log('═══════════════════════════════════════════════════');

  // ─── SETUP ─────────────────────────────────────────────
  console.log('\n──── SETUP: Creating Test Data ────');

  // Helper to get or create
  const existP = await api('GET', '/platforms');
  let platformId1 = existP.body?.data?.find(p => p.name === 'Instagram')?._id;
  if (!platformId1) {
    const p1Res = await api('POST', '/platforms', { name: 'Instagram', icon: '📸' });
    platformId1 = p1Res.body?.data?._id;
  }
  let platformId2 = existP.body?.data?.find(p => p.name === 'YouTube')?._id;
  if (!platformId2) {
    const p2Res = await api('POST', '/platforms', { name: 'YouTube', icon: '🎬' });
    platformId2 = p2Res.body?.data?._id;
  }
  console.log(`${INFO} Platforms: Instagram(${platformId1 || 'FAIL'}), YouTube(${platformId2 || 'FAIL'})`);

  // Categories
  const existC = await api('GET', '/categories');
  let categoryId1 = existC.body?.data?.find(c => c.name === 'Fitness')?._id;
  if (!categoryId1) {
    const cat1 = await api('POST', '/categories', { name: 'Fitness', color: '#ff6b6b' });
    categoryId1 = cat1.body?.data?._id;
  }
  console.log(`${INFO} Category: Fitness(${categoryId1 || 'FAIL'})`);

  // Tags
  const existT = await api('GET', '/tags');
  let tagId1 = existT.body?.data?.find(t => t.name === 'VIP')?._id;
  if (!tagId1) {
    const tag1 = await api('POST', '/tags', { name: 'VIP', color: '#ffd93d' });
    tagId1 = tag1.body?.data?._id;
  }
  let tagId2 = existT.body?.data?.find(t => t.name === 'Priority')?._id;
  if (!tagId2) {
    const tag2 = await api('POST', '/tags', { name: 'Priority', color: '#6c5ce7' });
    tagId2 = tag2.body?.data?._id;
  }
  console.log(`${INFO} Tags: VIP(${tagId1 || 'FAIL'}), Priority(${tagId2 || 'FAIL'})`);

  // Create 3 clients
  const c1 = await api('POST', '/clients', {
    personalInfo: { fullName: 'Rahul Sharma', phone: '9876543210', email: 'rahul@test.com' },
    categoryId: categoryId1,
    tagIds: tagId1 ? [tagId1] : [],
    status: 'Active'
  });
  const clientId1 = c1.body?.data?._id;

  const c2 = await api('POST', '/clients', {
    personalInfo: { fullName: 'Priya Patel', phone: '9876543211', email: 'priya@test.com' },
    categoryId: categoryId1,
    tagIds: tagId2 ? [tagId2] : [],
    status: 'Active'
  });
  const clientId2 = c2.body?.data?._id;

  const c3 = await api('POST', '/clients', {
    personalInfo: { fullName: 'Amit Kumar', phone: '9876543212' },
    status: 'Active'
  });
  const clientId3 = c3.body?.data?._id;
  console.log(`${INFO} Clients: Rahul(${clientId1 || 'FAIL'}), Priya(${clientId2 || 'FAIL'}), Amit(${clientId3 || 'FAIL'})`);

  // Add accounts to Rahul via the accounts endpoint
  if (clientId1 && platformId1) {
    await api('POST', `/clients/${clientId1}/accounts`, { platformId: platformId1, username: 'rahulfitness', displayName: 'Rahul Fitness' });
    await api('POST', `/clients/${clientId1}/accounts`, { platformId: platformId2, username: 'rahulYT', displayName: 'Rahul YT' });
    console.log(`${INFO} Added 2 accounts to Rahul`);
  }

  // Add a note to Rahul via the notes endpoint
  if (clientId1) {
    await api('POST', `/clients/${clientId1}/notes`, { content: 'Top client, handle with care.' });
    console.log(`${INFO} Added 1 note to Rahul`);
  }

  // Create 5 content records
  const contentIds = [];
  for (let i = 1; i <= 5; i++) {
    const cid = i <= 2 ? clientId1 : (i <= 4 ? clientId2 : clientId3);
    if (!cid) continue;
    const res = await api('POST', '/content', {
      clientId: cid,
      title: `Test Content ${i}`,
      type: 'Image',
      caption: `Caption for test content ${i}`,
      hashtags: ['test', 'v1']
    });
    if (res.body?.data?._id) contentIds.push(res.body.data._id);
  }
  console.log(`${INFO} Created ${contentIds.length} content records`);


  // ═══════════════════════════════════════════════════════
  // TEST 1: BACKUP
  // ═══════════════════════════════════════════════════════
  console.log('\n──── TEST 1: Backup Creation ────');

  const backupRes = await rawGet('/backups/export');
  check('Backup returns HTTP 200', backupRes.status === 200);
  check('Content-Type is application/zip', backupRes.headers['content-type'] === 'application/zip');
  check('Backup has content (> 100 bytes)', backupRes.buffer.length > 100);

  const backupPath = path.join(__dirname, 'test_backup.zip');
  fs.writeFileSync(backupPath, backupRes.buffer);
  console.log(`${INFO} Saved to ${backupPath} (${backupRes.buffer.length} bytes)`);

  // Parse ZIP
  const AdmZip = require('adm-zip');
  const zip = new AdmZip(backupRes.buffer);
  const entries = zip.getEntries().map(e => e.entryName);

  check('ZIP contains metadata.json', entries.includes('metadata.json'));
  check('ZIP contains backup.json', entries.includes('backup.json'));
  check('ZIP does NOT contain storage/', !entries.some(e => e.startsWith('storage')));

  const metadata = JSON.parse(zip.getEntry('metadata.json').getData().toString('utf8'));
  check('metadata has createdAt', !!metadata.createdAt);
  check('metadata has appVersion', !!metadata.appVersion);
  check('metadata clientCount >= 3', metadata.clientCount >= 3);
  check('metadata contentCount >= 5', metadata.contentCount >= 5);
  console.log(`${INFO} metadata: clients=${metadata.clientCount}, content=${metadata.contentCount}, tags=${metadata.tagCount}, platforms=${metadata.platformCount}`);

  const backupData = JSON.parse(zip.getEntry('backup.json').getData().toString('utf8'));
  check('backup.json has clients array', Array.isArray(backupData.clients));
  check('backup.json has content array', Array.isArray(backupData.content));
  check('backup.json has tags', Array.isArray(backupData.tags));
  check('backup.json has platforms', Array.isArray(backupData.platforms));
  check('backup.json has categories', Array.isArray(backupData.categories));

  // Verify Rahul has accounts and notes in backup
  const rahulBackup = backupData.clients.find(c => c._id === clientId1);
  check('Backup contains Rahul with accounts', rahulBackup && rahulBackup.accounts?.length >= 2);
  check('Backup contains Rahul with notes', rahulBackup && rahulBackup.notes?.length >= 1);


  // ═══════════════════════════════════════════════════════
  // TEST 2: RESTORE (Most Important)
  // ═══════════════════════════════════════════════════════
  console.log('\n──── TEST 2: Restore Test ────');

  // Step 1: Summary
  const summaryRes = await uploadZip('/backups/restore/summary', backupPath);
  check('Restore summary returns success', summaryRes.body?.success === true);
  check('Summary has createdAt', !!summaryRes.body?.data?.summary?.createdAt);
  check('Summary clientCount >= 3', summaryRes.body?.data?.summary?.clientCount >= 3);
  console.log(`${INFO} Summary: ${JSON.stringify(summaryRes.body?.data?.summary)}`);

  // Step 2: Confirm
  const confirmRes = await uploadZip('/backups/restore/confirm', backupPath);
  check('Restore confirm returns success', confirmRes.body?.success === true);

  // Step 3: Verify data survived
  const clientsAfter = await api('GET', '/clients');
  check('Clients exist after restore', clientsAfter.body?.data?.length >= 3);

  const contentAfter = await api('GET', '/content');
  check('Content exists after restore', contentAfter.body?.data?.length >= 5);

  const tagsAfter = await api('GET', '/tags');
  check('Tags exist after restore', tagsAfter.body?.data?.length >= 2);

  const platformsAfter = await api('GET', '/platforms');
  check('Platforms exist after restore', platformsAfter.body?.data?.length >= 2);

  // Verify Rahul's accounts/notes survived restore
  const rahulAfter = clientsAfter.body?.data?.find(c => c.personalInfo?.fullName === 'Rahul Sharma');
  check('Rahul exists after restore', !!rahulAfter);
  if (rahulAfter) {
    const rahulDetail = await api('GET', `/clients/${rahulAfter._id}`);
    check('Rahul has accounts after restore', rahulDetail.body?.data?.accounts?.length >= 2);
    check('Rahul has notes after restore', rahulDetail.body?.data?.notes?.length >= 1);
  }


  // ═══════════════════════════════════════════════════════
  // TEST 3: MISSING FILES REPORT
  // ═══════════════════════════════════════════════════════
  console.log('\n──── TEST 3: Missing Files Report ────');

  const storageRes = await api('GET', '/storage/overview');
  check('Storage overview returns success', storageRes.body?.success === true);
  check('Has storageTotal', !!storageRes.body?.data?.storageTotal);
  check('Has topClients array', Array.isArray(storageRes.body?.data?.topClients));
  check('Has topContent array', Array.isArray(storageRes.body?.data?.topContent));
  check('Has missingFiles array', Array.isArray(storageRes.body?.data?.missingFiles));
  check('Has health data', !!storageRes.body?.data?.health);

  const st = storageRes.body?.data?.storageTotal;
  console.log(`${INFO} Total: ${st?.sizeBytes} bytes, ${st?.filesCount} files, ${st?.foldersCount} folders`);
  console.log(`${INFO} Missing: ${storageRes.body?.data?.missingFiles?.length}, RecycleBin: ${storageRes.body?.data?.health?.recycleBinCount}`);


  // ═══════════════════════════════════════════════════════
  // TEST 4: RECYCLE BIN — SOFT DELETE + RESTORE
  // ═══════════════════════════════════════════════════════
  console.log('\n──── TEST 4: Recycle Bin — Soft Delete + Restore ────');

  const allContent = await api('GET', '/content');
  const testContent = allContent.body?.data?.[0];

  if (testContent) {
    // Soft-delete via DELETE endpoint
    const softDel = await api('DELETE', `/content/${testContent._id}`);
    check('Soft delete returns 200', softDel.status === 200);

    // Check recycle bin
    const binRes = await api('GET', '/recycle-bin');
    check('Recycle bin returns success', binRes.body?.success === true);

    const binItem = binRes.body?.data?.find(i => i._id === testContent._id);
    if (binItem) {
      check('Deleted content appears in recycle bin', true);
      
      // Restore
      const restoreRes = await api('POST', '/recycle-bin/restore', { id: testContent._id, type: 'Content' });
      check('Restore from recycle bin succeeds', restoreRes.body?.success === true);

      const afterRestore = await api('GET', `/content/${testContent._id}`);
      check('Content restored (not Recycle Bin)', afterRestore.body?.data?.globalStatus !== 'Recycle Bin');
    } else {
      check('Deleted content appears in recycle bin', false);
    }
  } else {
    check('Content available for recycle bin test', false);
  }


  // ═══════════════════════════════════════════════════════
  // TEST 5: PERMANENT DELETE
  // ═══════════════════════════════════════════════════════
  console.log('\n──── TEST 5: Permanent Delete ────');

  const allContent2 = await api('GET', '/content');
  const lastContent = allContent2.body?.data?.[allContent2.body.data.length - 1];

  if (lastContent) {
    // Hard delete via recycle bin endpoint
    const permRes = await api('POST', '/recycle-bin/delete', { id: lastContent._id, type: 'Content' });
    check('Permanent delete returns success', permRes.body?.success === true);

    const afterDel = await api('GET', `/content/${lastContent._id}`);
    check('Content gone after permanent delete', !afterDel.body?.data || afterDel.status === 404);
  } else {
    check('Content available for permanent delete test', false);
  }


  // ═══════════════════════════════════════════════════════
  // TEST 6: SNAPSHOT UPSERT
  // ═══════════════════════════════════════════════════════
  console.log('\n──── TEST 6: Snapshot Generation & Upsert ────');

  const snap1 = await api('POST', '/snapshots/generate');
  check('First snapshot returns success', snap1.body?.success === true);
  check('Snapshot has month', !!snap1.body?.data?.month);
  check('Snapshot has activeClients', snap1.body?.data?.activeClients !== undefined);
  check('Snapshot has totalContent', snap1.body?.data?.totalContent !== undefined);
  check('Snapshot has storageUsed', snap1.body?.data?.storageUsed !== undefined);

  const month1 = snap1.body?.data?.month;
  const id1 = snap1.body?.data?._id;
  console.log(`${INFO} Snapshot 1: month=${month1}, id=${id1}`);

  // Generate again (should upsert)
  const snap2 = await api('POST', '/snapshots/generate');
  const month2 = snap2.body?.data?.month;
  const id2 = snap2.body?.data?._id;
  console.log(`${INFO} Snapshot 2: month=${month2}, id=${id2}`);

  check('Same month', month1 === month2);
  check('Upsert: same _id (not duplicate)', id1 === id2);

  const allSnaps = await api('GET', '/snapshots');
  const monthSnaps = allSnaps.body?.data?.filter(s => s.month === month1);
  check('Only one snapshot for current month', monthSnaps?.length === 1);


  // ═══════════════════════════════════════════════════════
  // TEST 7: STORAGE CALCULATION
  // ═══════════════════════════════════════════════════════
  console.log('\n──── TEST 7: Storage Calculation ────');

  const storageRes2 = await api('GET', '/storage/overview');
  const sd = storageRes2.body?.data;

  check('sizeBytes is number', typeof sd?.storageTotal?.sizeBytes === 'number');
  check('filesCount is number', typeof sd?.storageTotal?.filesCount === 'number');
  check('foldersCount is number', typeof sd?.storageTotal?.foldersCount === 'number');

  check('topClients sorted desc', (() => {
    const arr = sd?.topClients || [];
    for (let i = 1; i < arr.length; i++) { if (arr[i].sizeBytes > arr[i-1].sizeBytes) return false; }
    return true;
  })());
  check('topContent sorted desc', (() => {
    const arr = sd?.topContent || [];
    for (let i = 1; i < arr.length; i++) { if (arr[i].sizeBytes > arr[i-1].sizeBytes) return false; }
    return true;
  })());
  check('topClients max 10', (sd?.topClients?.length || 0) <= 10);
  check('topContent max 20', (sd?.topContent?.length || 0) <= 20);


  // ═══════════════════════════════════════════════════════
  // TEST 8: CLIENT RENAME
  // ═══════════════════════════════════════════════════════
  console.log('\n──── TEST 8: Client Rename ────');

  const allClients = await api('GET', '/clients');
  const rahulClient = allClients.body?.data?.find(c => c.personalInfo?.fullName === 'Rahul Sharma');

  if (rahulClient) {
    const renameRes = await api('PUT', `/clients/${rahulClient._id}`, {
      personalInfo: { ...rahulClient.personalInfo, fullName: 'Rahul Sharma Fitness' }
    });
    check('Rename returns 200', renameRes.status === 200);

    const afterRename = await api('GET', `/clients/${rahulClient._id}`);
    check('Name updated to "Rahul Sharma Fitness"', afterRename.body?.data?.personalInfo?.fullName === 'Rahul Sharma Fitness');
    check('Accounts preserved', afterRename.body?.data?.accounts?.length >= 2);
    check('Notes preserved', afterRename.body?.data?.notes?.length >= 1);

    // Rename back
    await api('PUT', `/clients/${rahulClient._id}`, {
      personalInfo: { ...rahulClient.personalInfo, fullName: 'Rahul Sharma' }
    });
    console.log(`${INFO} Renamed back to "Rahul Sharma"`);
  } else {
    check('Rahul found for rename test', false);
  }


  // ═══════════════════════════════════════════════════════
  // BONUS: Dashboard & Search
  // ═══════════════════════════════════════════════════════
  console.log('\n──── BONUS: Dashboard ────');
  const dashRes = await api('GET', '/dashboard/stats');
  check('Dashboard returns success', dashRes.body?.success === true);
  check('Dashboard has activeClients', dashRes.body?.data?.kpis?.activeClients !== undefined);

  console.log('\n──── BONUS: Search ────');
  const searchRes = await api('GET', '/search?q=Rahul');
  check('Search returns success', searchRes.body?.success === true);
  const hasResults = (searchRes.body?.data?.clients?.length > 0 || searchRes.body?.data?.accounts?.length > 0);
  check('Search finds "Rahul"', hasResults);


  // ═══════════════════════════════════════════════════════
  // CLEANUP
  // ═══════════════════════════════════════════════════════
  try { fs.unlinkSync(backupPath); } catch(e) {}

  // ═══════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  RESULTS: ${passed} passed, ${failed} failed`);
  console.log('═══════════════════════════════════════════════════');
  if (failed === 0) {
    console.log('  🎉 ALL TESTS PASSED — V1 IS VERIFIED');
  } else {
    console.log(`  ⚠️  ${failed} test(s) need attention`);
  }
  console.log('');
}

run().catch(err => {
  console.error('Test suite crashed:', err);
  process.exit(1);
});
