import { useState, useEffect } from 'react';
import { platformsApi } from '../api';
import { Plus, Pencil, Trash2, X, Check, Loader2, Lock } from 'lucide-react';

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formIcon, setFormIcon] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  async function fetchPlatforms() {
    try {
      setLoading(true);
      const res = await platformsApi.getAll();
      setPlatforms(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function openAddForm() {
    setEditingId(null);
    setFormName('');
    setFormIcon('');
    setFormDesc('');
    setFormError(null);
    setShowForm(true);
  }

  function openEditForm(platform) {
    setEditingId(platform._id);
    setFormName(platform.name);
    setFormIcon(platform.icon || '');
    setFormDesc(platform.description || '');
    setFormError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim()) {
      setFormError('Platform name is required');
      return;
    }

    try {
      setSaving(true);
      const body = { name: formName, icon: formIcon, description: formDesc };

      if (editingId) {
        await platformsApi.update(editingId, body);
      } else {
        await platformsApi.create(body);
      }

      closeForm();
      fetchPlatforms();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete platform "${name}"? This is permanent.`)) return;

    try {
      await platformsApi.delete(id);
      fetchPlatforms();
    } catch (err) {
      setError(err.message);
    }
  }

  // ---- Styles ----
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    title: { fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px' },
    subtitle: { fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 },
    addBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 20px',
      backgroundColor: 'var(--color-accent)',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.15s ease',
    },
    table: { width: '100%', borderCollapse: 'separate', borderSpacing: 0 },
    th: {
      textAlign: 'left',
      padding: '12px 16px',
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: 'var(--color-text-secondary)',
      borderBottom: '1px solid var(--color-border)',
    },
    td: {
      padding: '14px 16px',
      fontSize: 14,
      borderBottom: '1px solid var(--color-border)',
    },
    actionBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 6,
      borderRadius: 6,
      display: 'inline-flex',
      transition: 'background-color 0.15s ease',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
    },
    overlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    },
    modal: {
      backgroundColor: 'var(--color-bg-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 16,
      padding: 32,
      width: 420,
      maxWidth: '90vw',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      backgroundColor: 'var(--color-bg-primary)',
      border: '1px solid var(--color-border)',
      borderRadius: 8,
      color: 'var(--color-text-primary)',
      fontSize: 14,
      outline: 'none',
    },
    label: {
      display: 'block',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--color-text-secondary)',
      marginBottom: 6,
    },
    formGroup: { marginBottom: 20 },
    errorText: { color: 'var(--color-danger)', fontSize: 13, marginTop: 8 },
    emptyState: {
      textAlign: 'center',
      padding: 48,
      color: 'var(--color-text-secondary)',
    },
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Platforms</h1>
          <p style={styles.subtitle}>
            Manage built-in and custom social media platforms
          </p>
        </div>
        <button
          style={styles.addBtn}
          onClick={openAddForm}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = 'var(--color-accent-hover)')
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = 'var(--color-accent)')
          }
        >
          <Plus size={16} />
          Add Custom Platform
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            border: '1px solid var(--color-danger)',
            borderRadius: 8,
            color: 'var(--color-danger)',
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={styles.emptyState}>
          <Loader2
            size={24}
            style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }}
          />
          <p style={{ marginTop: 12 }}>Loading platforms...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Table */}
      {!loading && platforms.length > 0 && (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Description</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p) => (
                <tr
                  key={p._id}
                  style={{ transition: 'background-color 0.1s ease' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <td style={{ ...styles.td, fontWeight: 600 }}>{p.name}</td>
                  <td style={styles.td}>
                    {p.isCustom ? (
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor: 'rgba(108, 92, 231, 0.15)',
                          color: 'var(--color-accent)',
                        }}
                      >
                        Custom
                      </span>
                    ) : (
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor: 'rgba(46, 204, 113, 0.15)',
                          color: 'var(--color-success)',
                        }}
                      >
                        <Lock size={10} />
                        Built-in
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      ...styles.td,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {p.description || '—'}
                  </td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>
                    <button
                      style={styles.actionBtn}
                      title="Edit"
                      onClick={() => openEditForm(p)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      <Pencil size={15} color="var(--color-text-secondary)" />
                    </button>
                    {p.isCustom && (
                      <button
                        style={{ ...styles.actionBtn, marginLeft: 4 }}
                        title="Delete"
                        onClick={() => handleDelete(p._id, p.name)}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = 'rgba(231, 76, 60, 0.15)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                      >
                        <Trash2 size={15} color="var(--color-danger)" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <div style={styles.overlay} onClick={closeForm}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>
                {editingId ? 'Edit Platform' : 'Add Custom Platform'}
              </h2>
              <button
                onClick={closeForm}
                style={{ ...styles.actionBtn, color: 'var(--color-text-secondary)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name *</label>
                <input
                  style={styles.input}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Telegram, Snapchat"
                  autoFocus
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Icon Key</label>
                <input
                  style={styles.input}
                  value={formIcon}
                  onChange={(e) => setFormIcon(e.target.value)}
                  placeholder="e.g. telegram, snapchat (lowercase)"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <input
                  style={styles.input}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Optional description"
                />
              </div>

              {formError && <p style={styles.errorText}>{formError}</p>}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 12,
                  marginTop: 24,
                }}
              >
                <button
                  type="button"
                  onClick={closeForm}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    color: 'var(--color-text-secondary)',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ ...styles.addBtn, opacity: saving ? 0.6 : 1 }}
                >
                  {saving ? (
                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <Check size={16} />
                  )}
                  {editingId ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
