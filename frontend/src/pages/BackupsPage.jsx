import { useState, useEffect, useRef } from 'react';
import { backupsApi, snapshotsApi } from '../api';

export default function BackupsPage() {
  const [snapshots, setSnapshots] = useState([]);
  const [isLoadingSnapshots, setIsLoadingSnapshots] = useState(true);
  
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Restore State
  const fileInputRef = useRef(null);
  const [restoreFile, setRestoreFile] = useState(null);
  const [restoreSummary, setRestoreSummary] = useState(null);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    loadSnapshots();
  }, []);

  const loadSnapshots = () => {
    setIsLoadingSnapshots(true);
    snapshotsApi.getSnapshots()
      .then(res => setSnapshots(res.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoadingSnapshots(false));
  };

  // ---- Backups ----

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const blob = await backupsApi.export();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `IdentityHub_Backup_${new Date().toISOString().replace(/[:.]/g, '-')}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      alert('Failed to create backup.');
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setRestoreFile(file);
    setIsRestoring(true);
    
    try {
      const res = await backupsApi.restoreSummary(file);
      setRestoreSummary(res.data.summary);
    } catch (err) {
      alert('Invalid backup file.');
      console.error(err);
      setRestoreFile(null);
      setRestoreSummary(null);
    } finally {
      setIsRestoring(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const confirmRestore = async () => {
    if (!restoreFile) return;
    if (!window.confirm('WARNING: This will permanently overwrite your existing database with the backup data. Media files will be unaffected. Continue?')) {
      return;
    }

    setIsRestoring(true);
    try {
      await backupsApi.restoreConfirm(restoreFile);
      alert('Restore complete! The page will now reload.');
      window.location.href = '/';
    } catch (err) {
      alert('Failed to restore backup.');
      console.error(err);
      setIsRestoring(false);
    }
  };

  const cancelRestore = () => {
    setRestoreFile(null);
    setRestoreSummary(null);
  };

  // ---- Snapshots ----

  const handleGenerateSnapshot = async () => {
    setIsGenerating(true);
    try {
      await snapshotsApi.generate();
      loadSnapshots();
    } catch (err) {
      alert('Failed to generate snapshot.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Backups & Snapshots</h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginBottom: 32 }}>
        Manage database backups and record historical snapshots of your system size.
      </p>

      {/* Backups Section */}
      <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)', marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Data Backup</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
          Exports all configuration, clients, content metadata, and tags as a ZIP archive. <br/>
          <strong>Note:</strong> Physical media files in the storage folder are excluded and must be backed up manually.
        </p>

        <div style={{ display: 'flex', gap: 16 }}>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            style={{ padding: '10px 20px', backgroundColor: 'var(--color-accent)', color: 'white', borderRadius: 8, fontWeight: 600, border: 'none', cursor: isExporting ? 'not-allowed' : 'pointer', opacity: isExporting ? 0.7 : 1 }}
          >
            {isExporting ? 'Creating Backup...' : 'Download Backup (ZIP)'}
          </button>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            style={{ padding: '10px 20px', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
          >
            Restore Backup...
          </button>
          <input 
            type="file" 
            accept=".zip" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />
        </div>

        {/* Restore Confirmation UI */}
        {restoreSummary && (
          <div style={{ marginTop: 24, padding: 20, backgroundColor: 'rgba(214, 48, 49, 0.05)', border: '1px solid rgba(214, 48, 49, 0.3)', borderRadius: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d63031', marginBottom: 12 }}>⚠️ Confirm Restore</h3>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 16 }}>
              You are about to restore a backup created on <strong>{new Date(restoreSummary.createdAt).toLocaleString()}</strong>.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 12, borderRadius: 6, border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Clients</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{restoreSummary.clientCount}</div>
              </div>
              <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 12, borderRadius: 6, border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Content Records</div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{restoreSummary.contentCount}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                onClick={confirmRestore}
                disabled={isRestoring}
                style={{ padding: '8px 16px', backgroundColor: '#d63031', color: 'white', borderRadius: 6, fontWeight: 600, border: 'none', cursor: isRestoring ? 'not-allowed' : 'pointer' }}
              >
                {isRestoring ? 'Restoring...' : 'Yes, Overwrite Database'}
              </button>
              <button 
                onClick={cancelRestore}
                disabled={isRestoring}
                style={{ padding: '8px 16px', backgroundColor: 'transparent', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', borderRadius: 6, fontWeight: 600, cursor: isRestoring ? 'not-allowed' : 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Snapshots Section */}
      <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Historical Snapshots</h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
              Manually capture the current size and scale of your system for reporting.
            </p>
          </div>
          <button 
            onClick={handleGenerateSnapshot}
            disabled={isGenerating}
            style={{ padding: '8px 16px', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', borderRadius: 6, fontWeight: 600, cursor: isGenerating ? 'not-allowed' : 'pointer', opacity: isGenerating ? 0.7 : 1 }}
          >
            {isGenerating ? 'Generating...' : 'Generate Snapshot'}
          </button>
        </div>

        {isLoadingSnapshots ? (
          <div style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Loading snapshots...</div>
        ) : snapshots.length === 0 ? (
          <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', padding: '20px 0', borderTop: '1px solid var(--color-border)' }}>No snapshots recorded yet.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '12px 0', fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Date</th>
                <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Clients</th>
                <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Content</th>
                <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Storage</th>
              </tr>
            </thead>
            <tbody>
              {snapshots.map(s => {
                const formatBytes = (bytes) => {
                  if (!bytes || bytes === 0) return '0 Bytes';
                  const k = 1024;
                  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                  const i = Math.floor(Math.log(bytes) / Math.log(k));
                  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
                };
                return (
                  <tr key={s._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-primary)', fontWeight: 500 }}>
                      {s.month}
                    </td>
                    <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'right' }}>{s.activeClients}</td>
                    <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'right' }}>{s.totalContent}</td>
                    <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'right' }}>{formatBytes(s.storageUsed)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
