import { useState, useEffect } from 'react';
import { tagsApi } from '../api';
import { Plus, Pencil, Trash2, X, Check, Loader2 } from 'lucide-react';

// Preset color palette for tags
const COLOR_PRESETS = [
  '#6c5ce7', // Purple (default)
  '#e74c3c', // Red
  '#e67e22', // Orange
  '#f1c40f', // Yellow
  '#2ecc71', // Green
  '#1abc9c', // Teal
  '#3498db', // Blue
  '#9b59b6', // Violet
  '#e84393', // Pink
  '#636e72', // Gray
];

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formColor, setFormColor] = useState(COLOR_PRESETS[0]);
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    try {
      setLoading(true);
      const res = await tagsApi.getAll();
      setTags(res.data);
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
    setFormColor(COLOR_PRESETS[0]);
    setFormError(null);
    setShowForm(true);
  }

  function openEditForm(tag) {
    setEditingId(tag._id);
    setFormName(tag.name);
    setFormColor(tag.color || COLOR_PRESETS[0]);
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
      setFormError('Tag name is required');
      return;
    }

    try {
      setSaving(true);
      const body = { name: formName, color: formColor };

      if (editingId) {
        await tagsApi.update(editingId, body);
      } else {
        await tagsApi.create(body);
      }

      closeForm();
      fetchTags();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete tag "${name}"? This is permanent.`)) return;

    try {
      await tagsApi.delete(id);
      fetchTags();
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
    tagGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 12,
    },
    tagCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      backgroundColor: 'var(--color-bg-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 10,
      transition: 'background-color 0.15s ease',
    },
    tagDot: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      flexShrink: 0,
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
    colorGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
    },
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Tags</h1>
          <p style={styles.subtitle}>
            Create colored tags to label and filter clients and content
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
          Add Tag
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
          <p style={{ marginTop: 12 }}>Loading tags...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Empty State */}
      {!loading && tags.length === 0 && (
        <div className="glass-card" style={styles.emptyState}>
          <p style={{ fontSize: 16, fontWeight: 600 }}>No tags yet</p>
          <p style={{ marginTop: 4 }}>
            Click "Add Tag" to create your first one.
          </p>
        </div>
      )}

      {/* Tags Grid */}
      {!loading && tags.length > 0 && (
        <div style={styles.tagGrid}>
          {tags.map((tag) => (
            <div
              key={tag._id}
              style={styles.tagCard}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--color-bg-card)')
              }
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{ ...styles.tagDot, backgroundColor: tag.color }}
                />
                <span style={{ fontSize: 14, fontWeight: 600 }}>
                  {tag.name}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 2 }}>
                <button
                  style={styles.actionBtn}
                  title="Edit"
                  onClick={() => openEditForm(tag)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <Pencil size={14} color="var(--color-text-secondary)" />
                </button>
                <button
                  style={styles.actionBtn}
                  title="Delete"
                  onClick={() => handleDelete(tag._id, tag.name)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'rgba(231, 76, 60, 0.15)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <Trash2 size={14} color="var(--color-danger)" />
                </button>
              </div>
            </div>
          ))}
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
                {editingId ? 'Edit Tag' : 'Add Tag'}
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
                  placeholder="e.g. VIP, Urgent, Fitness"
                  autoFocus
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Color</label>
                <div style={styles.colorGrid}>
                  {COLOR_PRESETS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFormColor(c)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        backgroundColor: c,
                        border:
                          formColor === c
                            ? '2px solid #fff'
                            : '2px solid transparent',
                        cursor: 'pointer',
                        transition: 'border-color 0.1s ease',
                      }}
                    />
                  ))}
                </div>
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
