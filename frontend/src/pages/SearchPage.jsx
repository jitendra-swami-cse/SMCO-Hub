import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchApi } from '../api';

export default function SearchPage() {
  const location = useLocation();
  const [results, setResults] = useState({ clients: [], content: [], accounts: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (!q || q.length < 2) {
        setResults({ clients: [], content: [], accounts: [] });
        return;
      }
      
      try {
        setIsLoading(true);
        const res = await searchApi.query(q);
        setResults(res.data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [q]);

  if (!q || q.length < 2) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--color-text-secondary)' }}>
        <p style={{ fontSize: 40, marginBottom: 16 }}>🔍</p>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Start searching...</h2>
        <p style={{ marginTop: 8 }}>Type at least 2 characters to search across clients, content, and accounts.</p>
      </div>
    );
  }

  const hasResults = results.clients.length > 0 || results.content.length > 0 || results.accounts.length > 0;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Search Results for "{q}"</h1>
      
      {error && (
        <div style={{ padding: 12, backgroundColor: 'rgba(214, 48, 49, 0.1)', color: '#d63031', borderRadius: 6, marginBottom: 24 }}>
          {error}
        </div>
      )}

      {isLoading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-secondary)' }}>Searching...</div>
      ) : !hasResults ? (
        <div style={{ padding: 40, textAlign: 'center', backgroundColor: 'var(--color-bg-card)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>No results found for "{q}".</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {/* CLIENTS SECTION */}
          {results.clients.length > 0 && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>
                Clients ({results.clients.length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {results.clients.map(client => (
                  <Link 
                    key={client._id} 
                    to={`/clients/${client._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="glass-card" style={{ padding: 16, transition: 'transform 0.2s', cursor: 'pointer' }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>{client.name}</div>
                      <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>{client.category || 'No Category'}</div>
                      <div style={{ 
                        fontSize: 12, fontWeight: 500, marginTop: 12, display: 'inline-block',
                        padding: '2px 8px', borderRadius: 4, 
                        backgroundColor: client.status === 'Active' ? '#00b89420' : '#636e7220',
                        color: client.status === 'Active' ? '#00b894' : '#636e72'
                      }}>
                        {client.status}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CONTENT SECTION */}
          {results.content.length > 0 && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>
                Content ({results.content.length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {results.content.map(item => (
                  <Link 
                    key={item._id} 
                    to={`/content/${item._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="glass-card" style={{ padding: 16, transition: 'transform 0.2s', cursor: 'pointer' }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.title}</div>
                      <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>Client: {item.clientName}</div>
                      <div style={{ fontSize: 13, color: 'var(--color-accent)', marginTop: 12 }}>
                        {item.platforms}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ACCOUNTS SECTION */}
          {results.accounts.length > 0 && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>
                Accounts ({results.accounts.length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {results.accounts.map(acc => (
                  <Link 
                    key={acc._id} 
                    to={`/clients/${acc.clientId}?tab=accounts`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="glass-card" style={{ padding: 16, transition: 'transform 0.2s', cursor: 'pointer' }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>@{acc.username}</div>
                      <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>{acc.platformIcon}</span> {acc.platformName}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 12 }}>
                        Client: <span style={{ color: 'var(--color-accent)' }}>{acc.clientName}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
