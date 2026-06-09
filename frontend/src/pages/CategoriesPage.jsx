import { useState, useEffect } from 'react';
import { categoriesApi } from '../api';
import { Plus, Pencil, Trash2, X, Check, Loader2 } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      const res = await categoriesApi.getAll();
      setCategories(res.data);
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
    setFormDesc('');
    setFormError(null);
    setShowForm(true);
  }

  function openEditForm(category) {
    setEditingId(category._id);
    setFormName(category.name);
    setFormDesc(category.description || '');
    setFormError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setFormName('');
    setFormDesc('');
    setFormError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim()) {
      setFormError('Category name is required');
      return;
    }

    try {
      setSaving(true);
      const body = { name: formName, description: formDesc };

      if (editingId) {
        await categoriesApi.update(editingId, body);
      } else {
        await categoriesApi.create(body);
      }

      closeForm();
      fetchCategories();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete category "${name}"? This is permanent.`)) {
      return;
    }

    try {
      await categoriesApi.delete(id);
      fetchCategories();
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
    title: {
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    subtitle: {
      fontSize: 13,
      color: 'var(--color-text-secondary)',
      marginTop: 4,
    },
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
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
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
    // Modal overlay
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
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
      transition: 'border-color 0.15s ease',
    },
    label: {
      display: 'block',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--color-text-secondary)',
      marginBottom: 6,
    },
    formGroup: {
      marginBottom: 20,
    },
    errorText: {
      color: 'var(--color-danger)',
      fontSize: 13,
      marginTop: 8,
    },
    emptyState: {
      textAlign: 'center',
      padding: 48,
      color: 'var(--color-text-secondary)',
    },
  };

  // ---- Render ----
  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Categories</h1>
          <p style={styles.subtitle}>
            Organize your clients into categories for easy filtering
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
          Add Category
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

      {/* Loading State */}
      {loading && (
        <div style={styles.emptyState}>
          <Loader2
            size={24}
            style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }}
          />
          <p style={{ marginTop: 12 }}>Loading categories...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Empty State */}
      {!loading && categories.length === 0 && (
        <div className="glass-card" style={styles.emptyState}>
          <p style={{ fontSize: 16, fontWeight: 600 }}>No categories yet</p>
          <p style={{ marginTop: 4 }}>
            Click "Add Category" to create your first one.
          </p>
        </div>
      )}

      {/* Categories Table */}
      {!loading && categories.length > 0 && (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Description</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat._id}
                  style={{ transition: 'background-color 0.1s ease' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      'var(--color-bg-hover)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <td style={{ ...styles.td, fontWeight: 600 }}>{cat.name}</td>
                  <td
                    style={{
                      ...styles.td,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {cat.description || '—'}
                  </td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>
                    <button
                      style={styles.actionBtn}
                      title="Edit"
                      onClick={() => openEditForm(cat)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          'var(--color-bg-hover)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      <Pencil size={15} color="var(--color-text-secondary)" />
                    </button>
                    <button
                      style={{ ...styles.actionBtn, marginLeft: 4 }}
                      title="Delete"
                      onClick={() => handleDelete(cat._id, cat.name)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          'rgba(231, 76, 60, 0.15)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      <Trash2 size={15} color="var(--color-danger)" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---- Add / Edit Modal ---- */}
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
                {editingId ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={closeForm}
                style={{
                  ...styles.actionBtn,
                  color: 'var(--color-text-secondary)',
                }}
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
                  placeholder="e.g. Business, Individual"
                  autoFocus
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
                  style={{
                    ...styles.addBtn,
                    opacity: saving ? 0.6 : 1,
                  }}
                >
                  {saving ? (
                    <Loader2
                      size={16}
                      style={{ animation: 'spin 1s linear infinite' }}
                    />
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
