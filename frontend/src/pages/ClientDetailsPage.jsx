import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { clientsApi } from '../api';
import AccountModal from '../components/AccountModal';
import NoteModal from '../components/NoteModal';

export default function ClientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal states
  const [accountModal, setAccountModal] = useState({ isOpen: false, initialData: null });
  const [noteModal, setNoteModal] = useState({ isOpen: false, initialData: null });
  // Visibility for credentials vault
  const [revealedCreds, setRevealedCreds] = useState({});

  const fetchClient = async () => {
    try {
      setIsLoading(true);
      const res = await clientsApi.getById(id);
      setClient(res.data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
  }, [id]);

  // ---- Accounts Handlers ----
  const handleSaveAccount = async (accountData) => {
    try {
      if (accountModal.initialData) {
        await clientsApi.accounts.update(id, accountModal.initialData.accountId, accountData);
      } else {
        await clientsApi.accounts.add(id, accountData);
      }
      setAccountModal({ isOpen: false, initialData: null });
      fetchClient();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    if (!window.confirm('Are you sure you want to remove this account?')) return;
    try {
      await clientsApi.accounts.delete(id, accountId);
      fetchClient();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleCredVisibility = (accountId) => {
    setRevealedCreds(prev => ({ ...prev, [accountId]: !prev[accountId] }));
  };

  // ---- Notes Handlers ----
  const handleSaveNote = async (noteData) => {
    try {
      if (noteModal.initialData) {
        await clientsApi.notes.update(id, noteModal.initialData.noteId, noteData);
      } else {
        await clientsApi.notes.add(id, noteData);
      }
      setNoteModal({ isOpen: false, initialData: null });
      fetchClient();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await clientsApi.notes.delete(id, noteId);
      fetchClient();
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading client details...</div>;
  if (error) return <div style={{ padding: 40, color: '#d63031' }}>Error: {error}</div>;
  if (!client) return <div style={{ padding: 40 }}>Client not found</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#00b894';
      case 'Inactive': return '#fdcb6e';
      case 'Suspended': return '#d63031';
      case 'Closed': return '#636e72';
      default: return '#0984e3';
    }
  };

  return (
    <div style={{ paddingBottom: 64 }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <Link to="/clients" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: 13, marginBottom: 8, display: 'inline-block' }}>
            ← Back to Clients
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>{client.personalInfo?.fullName}</h1>
            <span style={{ padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600, backgroundColor: `${getStatusColor(client.status)}20`, color: getStatusColor(client.status) }}>
              {client.status}
            </span>
            {client.rating && (
              <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>⭐ {client.rating}/10</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{client.categoryId?.name || 'Uncategorized'}</span>
            {client.tagIds?.map(t => (
              <span key={t._id} style={{ fontSize: 12, padding: '2px 8px', borderRadius: 12, backgroundColor: t.color, color: '#fff' }}>{t.name}</span>
            ))}
          </div>
        </div>
        <Link to={`/clients/${id}/edit`} style={{ padding: '8px 16px', backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 6, color: 'var(--color-text-primary)', textDecoration: 'none', fontWeight: 500 }}>
          Edit Client
        </Link>
      </div>

      {/* DASHBOARD GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24, alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 10, border: '1px solid var(--color-border)', padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Contact Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>Email:</span> {client.personalInfo?.email || '—'}</div>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>Phone:</span> {client.personalInfo?.phone || '—'}</div>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>WhatsApp:</span> {client.personalInfo?.whatsapp || '—'}</div>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>DOB:</span> {client.personalInfo?.dob ? new Date(client.personalInfo.dob).toLocaleDateString() : '—'}</div>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>Address:</span> {client.personalInfo?.address || '—'}</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 10, border: '1px solid var(--color-border)', padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Rating Note</h3>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{client.ratingNote || 'No notes on rating.'}</p>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 10, border: '1px solid var(--color-border)', padding: 24, opacity: 0.6 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Health Score</h3>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Pending formula definition...</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Accounts & Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* ACCOUNTS */}
          <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>Accounts ({client.accounts?.length || 0})</h3>
              <button 
                onClick={() => setAccountModal({ isOpen: true, initialData: null })}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 500, cursor: 'pointer' }}>
                + Add Account
              </button>
            </div>
            
            <div style={{ padding: 24 }}>
              {client.accounts?.length === 0 ? (
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, textAlign: 'center' }}>No accounts connected yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {client.accounts.map(acc => {
                    const isRevealed = revealedCreds[acc.accountId];
                    return (
                      <div key={acc.accountId} style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            {acc.platformId?.icon && <span style={{ fontSize: 20 }}>{acc.platformId.icon}</span>}
                            <div>
                              <div style={{ fontWeight: 600 }}>{acc.platformId?.name || 'Unknown Platform'}</div>
                              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>@{acc.username} {acc.displayName ? `(${acc.displayName})` : ''}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <span style={{ fontSize: 12, padding: '2px 6px', borderRadius: 4, backgroundColor: `${getStatusColor(acc.status)}20`, color: getStatusColor(acc.status) }}>{acc.status}</span>
                            <button onClick={() => setAccountModal({ isOpen: true, initialData: acc })} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 12 }}>Edit</button>
                            <button onClick={() => handleDeleteAccount(acc.accountId)} style={{ background: 'none', border: 'none', color: '#d63031', cursor: 'pointer', fontSize: 12 }}>Delete</button>
                          </div>
                        </div>

                        {acc.notes && <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12, fontStyle: 'italic' }}>{acc.notes}</p>}

                        {/* Credentials Vault */}
                        <div style={{ backgroundColor: 'var(--color-bg-base)', padding: 12, borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
                            <div>
                              <span style={{ color: 'var(--color-text-secondary)', marginRight: 8 }}>Pass:</span> 
                              <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>{isRevealed ? (acc.credential?.password || '—') : '••••••••'}</span>
                            </div>
                            <div>
                              <span style={{ color: 'var(--color-text-secondary)', marginRight: 8 }}>Rec. Email:</span> 
                              <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>{isRevealed ? (acc.credential?.recoveryEmail || '—') : '••••••••'}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => toggleCredVisibility(acc.accountId)}
                            style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: 4, padding: '4px 8px', fontSize: 12, color: 'var(--color-text-primary)', cursor: 'pointer' }}
                          >
                            {isRevealed ? 'Hide' : 'Reveal'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* NOTES TIMELINE */}
          <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>Notes Timeline</h3>
              <button 
                onClick={() => setNoteModal({ isOpen: true, initialData: null })}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 500, cursor: 'pointer' }}>
                + Add Note
              </button>
            </div>
            
            <div style={{ padding: 24 }}>
              {client.notes?.length === 0 ? (
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, textAlign: 'center' }}>No notes added yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[...client.notes].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map(note => (
                    <div key={note.noteId} style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: 16, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: -5, top: 5, width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                        <div>
                          <button onClick={() => setNoteModal({ isOpen: true, initialData: note })} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: 11, marginRight: 8 }}>Edit</button>
                          <button onClick={() => handleDeleteNote(note.noteId)} style={{ background: 'none', border: 'none', color: '#d63031', cursor: 'pointer', fontSize: 11 }}>Del</button>
                        </div>
                      </div>
                      <p style={{ fontSize: 14, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{note.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CONTENT PLACEHOLDER */}
          <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 10, border: '1px solid var(--color-border)', padding: 24, opacity: 0.6, textAlign: 'center' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Content Library</h3>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Coming soon in Phase 2...</p>
          </div>

        </div>
      </div>

      <AccountModal 
        isOpen={accountModal.isOpen} 
        initialData={accountModal.initialData} 
        onClose={() => setAccountModal({ isOpen: false, initialData: null })}
        onSave={handleSaveAccount}
      />
      <NoteModal 
        isOpen={noteModal.isOpen} 
        initialData={noteModal.initialData} 
        onClose={() => setNoteModal({ isOpen: false, initialData: null })}
        onSave={handleSaveNote}
      />
    </div>
  );
}
