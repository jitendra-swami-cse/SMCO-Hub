import { useState, useEffect } from 'react';
import { recycleBinApi } from '../api';

export default function RecycleBinPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    setIsLoading(true);
    recycleBinApi.getItems()
      .then(res => setItems(res.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleRestore = async (id, type) => {
    try {
      await recycleBinApi.restore(id, type);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      alert('Failed to restore item.');
      console.error(err);
    }
  };

  const handleHardDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to permanently delete this ${type}? This action cannot be undone.`)) return;
    try {
      await recycleBinApi.hardDelete(id, type);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      alert('Failed to permanently delete item.');
      console.error(err);
    }
  };

  // Helper to calculate days remaining
  const getDaysRemaining = (deletedAt) => {
    const purgeDate = new Date(deletedAt);
    purgeDate.setDate(purgeDate.getDate() + 30);
    const today = new Date();
    const diffTime = purgeDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Recycle Bin</h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginBottom: 32 }}>
        Deleted clients and content records are kept here for 30 days before being permanently removed.
      </p>

      {isLoading ? (
        <div style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Loading...</div>
      ) : items.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', backgroundColor: 'var(--color-bg-primary)', borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🗑️</div>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Recycle Bin is empty</h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>No items have been deleted recently.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'var(--color-bg-primary)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
                <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Name / Title</th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Status</th>
                <th style={{ textAlign: 'right', padding: '12px 20px', fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const daysRemaining = getDaysRemaining(item.deletedAt);
                return (
                  <tr key={item._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '16px 20px', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                      <span style={{ display: 'inline-block', padding: '2px 8px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 4, fontSize: 12, fontWeight: 500 }}>
                        {item.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px 0', fontSize: 14 }}>
                      <div style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{item.title}</div>
                      {item.clientName && <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>Client: {item.clientName}</div>}
                    </td>
                    <td style={{ padding: '16px 0', fontSize: 13 }}>
                      <div style={{ color: 'var(--color-text-secondary)' }}>Deleted {new Date(item.deletedAt).toLocaleDateString()}</div>
                      <div style={{ color: daysRemaining <= 7 ? '#d63031' : 'var(--color-text-secondary)', fontWeight: daysRemaining <= 7 ? 600 : 400, marginTop: 2 }}>
                        {daysRemaining} days remaining
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleRestore(item._id, item.type)}
                          style={{ padding: '6px 12px', backgroundColor: 'transparent', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                        >
                          Restore
                        </button>
                        <button 
                          onClick={() => handleHardDelete(item._id, item.type)}
                          style={{ padding: '6px 12px', backgroundColor: 'transparent', color: '#d63031', border: '1px solid #d63031', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
