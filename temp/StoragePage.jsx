import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageApi } from '../api';

export default function StoragePage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = () => {
    setIsLoading(true);
    storageApi.getOverview()
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        setError('Failed to load storage overview.');
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveMissingFile = async (contentId, fileName) => {
    if (!window.confirm(`Are you sure you want to remove the reference to ${fileName}? This will not delete the physical file if it later reappears, but the app will stop tracking it.`)) {
      return;
    }
    try {
      await storageApi.removeMissingFile(contentId, fileName);
      // Remove it locally from state
      setData(prev => ({
        ...prev,
        missingFiles: prev.missingFiles.filter(f => f.fileName !== fileName)
      }));
    } catch (err) {
      alert('Failed to remove file reference.');
      console.error(err);
    }
  };

  if (isLoading && !data) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-secondary)' }}>Scanning Storage...</div>;
  }

  if (error) {
    return <div style={{ padding: 40, color: '#d63031' }}>{error}</div>;
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const { storageTotal, topClients, topContent, missingFiles } = data;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)' }}>Storage Overview</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 4 }}>Manage your local file system health and capacity.</p>
        </div>
        <button onClick={loadStorageData} style={{ padding: '8px 16px', backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
          Rescan Storage
        </button>
      </div>

      {/* Row 1: KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 20, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)' }}>{formatBytes(storageTotal.sizeBytes)}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Total Storage Used</div>
        </div>
        <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 20, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)' }}>{storageTotal.filesCount}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Tracked Files</div>
        </div>
        <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 20, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)' }}>{storageTotal.foldersCount}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Folders</div>
        </div>
      </div>

      {/* Storage Health Widget */}
      <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 20, borderRadius: 12, border: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16 }}>Storage Health & Recovery</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Missing Files</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: missingFiles.length > 0 ? '#d63031' : '#00b894' }}>{missingFiles.length}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Recycle Bin</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{data.health?.recycleBinCount || 0} items</div>
            <div style={{ fontSize: 12, marginTop: 4 }}><Link to="/settings/recycle-bin" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>View Bin</Link></div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Last Backup</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>
              {data.health?.lastBackupDate ? new Date(data.health.lastBackupDate).toLocaleDateString() : 'Never'}
            </div>
            <div style={{ fontSize: 12, marginTop: 4 }}><Link to="/settings/backups" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Create Backup</Link></div>
          </div>
        </div>
      </div>

      {/* Missing Files Report (Warning) */}
      {missingFiles.length > 0 && (
        <div style={{ backgroundColor: 'rgba(214, 48, 49, 0.05)', borderRadius: 12, border: '1px solid rgba(214, 48, 49, 0.3)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(214, 48, 49, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#d63031' }}>⚠️ Missing Files Report ({missingFiles.length})</h2>
          </div>
          <div style={{ padding: 20 }}>
             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(214, 48, 49, 0.2)' }}>
                    <th style={{ textAlign: 'left', paddingBottom: 8, color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }}>Client</th>
                    <th style={{ textAlign: 'left', paddingBottom: 8, color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }}>Content</th>
                    <th style={{ textAlign: 'left', paddingBottom: 8, color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }}>Expected Path</th>
                    <th style={{ textAlign: 'right', paddingBottom: 8, color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {missingFiles.map((file, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(214, 48, 49, 0.1)' }}>
                      <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-primary)' }}>
                        <Link to={`/clients/${file.clientId}`} style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>{file.clientName}</Link>
                      </td>
                      <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-primary)' }}>
                         <Link to={`/content/${file.contentId}`} style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>{file.contentTitle}</Link>
                      </td>
                      <td style={{ padding: '12px 0', fontSize: 13, color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>{file.expectedPath}</td>
                      <td style={{ padding: '12px 0', textAlign: 'right' }}>
                        <button onClick={() => handleRemoveMissingFile(file.contentId, file.fileName)} style={{ fontSize: 12, padding: '4px 8px', backgroundColor: 'transparent', border: '1px solid #d63031', color: '#d63031', borderRadius: 4, cursor: 'pointer' }}>
                          Remove Reference
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 12, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                * Warning: These files exist in the database but cannot be found on the physical file system.
              </div>
          </div>
        </div>
      )}

      {/* Row 2: Top Clients & Top Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Top Clients */}
        <div style={{ backgroundColor: 'var(--color-bg-primary)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>Top 10 Largest Clients</h2>
          </div>
          <div style={{ padding: 20 }}>
            {topClients.length === 0 ? (
               <div style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>No data.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {topClients.map(client => (
                    <tr key={client.clientId} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-primary)' }}>
                        <Link to={`/clients/${client.clientId}`} style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>{client.name}</Link>
                      </td>
                      <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'right', fontWeight: 500 }}>{formatBytes(client.sizeBytes)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Top Content */}
        <div style={{ backgroundColor: 'var(--color-bg-primary)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>Top 20 Largest Content Records</h2>
          </div>
          <div style={{ padding: 20, maxHeight: 400, overflowY: 'auto' }}>
            {topContent.length === 0 ? (
               <div style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>No data.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {topContent.map((content, idx) => (
                    <tr key={`${content.contentId}-${idx}`} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 0', fontSize: 14 }}>
                        <div style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
                           <Link to={`/content/${content.contentId}`} style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>{content.title}</Link>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{content.clientName}</div>
                      </td>
                      <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'right', fontWeight: 500 }}>{formatBytes(content.sizeBytes)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
