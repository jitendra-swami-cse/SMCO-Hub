import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clientsApi } from '../api';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const res = await clientsApi.getAll();
      setClients(res.data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    try {
      await clientsApi.delete(id);
      fetchClients();
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#00b894';
      case 'Inactive': return '#fdcb6e';
      case 'Closed': return '#d63031';
      case 'Archived': return '#636e72';
      default: return '#0984e3';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px' }}>Clients</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>Manage your core clients and profiles</p>
        </div>
        <Link 
          to="/clients/new" 
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: 14
          }}
        >
          + Add Client
        </Link>
      </div>

      {error && (
        <div style={{ padding: 12, backgroundColor: 'rgba(214, 48, 49, 0.1)', color: '#d63031', borderRadius: 6, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {isLoading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading clients...</div>
      ) : clients.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', backgroundColor: 'var(--color-bg-card)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 16 }}>No clients found.</p>
          <Link to="/clients/new" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Create your first client</Link>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', backgroundColor: 'var(--color-bg-card)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'uppercase' }}>Client Info</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'uppercase' }}>Category</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'uppercase' }}>Rating</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'uppercase' }}>Health Score</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'uppercase' }}>Accounts</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'uppercase' }}>Ready Content</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'uppercase' }}>Uploaded Content</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'uppercase' }}>Last Updated</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: 12, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{client.personalInfo?.fullName}</div>
                    {client.tagIds && client.tagIds.length > 0 && (
                      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                        {client.tagIds.map(tag => (
                          <span 
                            key={tag._id} 
                            title={tag.name}
                            style={{
                              display: 'inline-block',
                              width: 8, height: 8, borderRadius: '50%', backgroundColor: tag.color || '#6c5ce7'
                            }}></span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    {client.categoryId?.name || <span style={{ color: 'var(--color-text-secondary)' }}>Uncategorized</span>}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500,
                      backgroundColor: `${getStatusColor(client.status)}20`,
                      color: getStatusColor(client.status)
                    }}>
                      {client.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    ⭐ {client.rating}/10
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    —
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    {client.accounts?.length || 0}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                    —
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                    —
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                    {new Date(client.updatedAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <Link to={`/clients/${client._id}`} style={{ color: 'var(--color-text-secondary)', marginRight: 12, textDecoration: 'none' }}>👁️</Link>
                    <Link to={`/clients/${client._id}/edit`} style={{ color: 'var(--color-text-secondary)', marginRight: 12, textDecoration: 'none' }}>✏️</Link>
                    <button 
                      onClick={() => handleDelete(client._id)}
                      style={{ background: 'none', border: 'none', color: '#d63031', cursor: 'pointer', padding: 0 }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
