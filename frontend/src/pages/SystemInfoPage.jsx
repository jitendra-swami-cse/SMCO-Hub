import { useState, useEffect } from 'react';
import { dashboardApi } from '../api';

export default function SystemInfoPage() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dashboardApi.getStats()
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>System Information</h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginBottom: 32 }}>
        Application version and environment diagnostics.
      </p>

      <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)', marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'var(--color-text-primary)' }}>App Status</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Version</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>IdentityHub v1.0.0 (Local)</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Database Connection</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#00b894' }}>Connected</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Environment</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Production</div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: 24, borderRadius: 12, border: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'var(--color-text-primary)' }}>Storage Configuration</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Media Storage Path</div>
            <div style={{ fontSize: 14, fontWeight: 500, wordBreak: 'break-all', fontFamily: 'monospace' }}>
              C:/Users/acer/identity-hub-storage
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              * Ensure this drive has sufficient space and is backed up regularly.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
