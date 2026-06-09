import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { contentApi, clientsApi } from '../api';

const CONTENT_TYPES = [
  'Image',
  'Carousel',
  'Short Video',
  'Video',
  'Story',
  'Text',
  'Other'
];

export default function ContentFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Image',
    clientId: '',
    receivedDate: new Date().toISOString().split('T')[0],
  });

  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load clients for the dropdown
    const fetchDropdownData = async () => {
      try {
        const clientsRes = await clientsApi.getAll();
        setClients(clientsRes.data);
      } catch (err) {
        setError('Failed to load clients: ' + err.message);
      }
    };

    fetchDropdownData();

    if (isEdit) {
      const fetchContent = async () => {
        setIsLoading(true);
        try {
          const res = await contentApi.getById(id);
          const c = res.data;
          setFormData({
            title: c.title || '',
            description: c.description || '',
            type: c.type || 'Image',
            clientId: c.clientId?._id || c.clientId || '',
            receivedDate: c.receivedDate ? new Date(c.receivedDate).toISOString().split('T')[0] : '',
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchContent();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      if (isEdit) {
        await contentApi.update(id, formData);
      } else {
        await contentApi.create(formData);
      }
      navigate('/content');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading content details...</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <Link to="/content" style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: 24 }}>
          ←
        </Link>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>
          {isEdit ? 'Edit Content' : 'Add New Content'}
        </h1>
      </div>

      {error && (
        <div style={{ padding: 12, backgroundColor: 'rgba(214, 48, 49, 0.1)', color: '#d63031', borderRadius: 6, marginBottom: 24 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>
            Content Details
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 6,
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)'
                }}
                placeholder="e.g. Summer Campaign Video"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                Client *
              </label>
              <select
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                required
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 6,
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)'
                }}
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client._id} value={client._id}>
                    {client.personalInfo.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                Content Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 6,
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)'
                }}
              >
                {CONTENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                Received Date *
              </label>
              <input
                type="date"
                name="receivedDate"
                value={formData.receivedDate}
                onChange={handleChange}
                required
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 6,
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 6,
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)',
                  resize: 'vertical'
                }}
                placeholder="Any special instructions or notes..."
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button
            type="button"
            onClick={() => navigate('/content')}
            style={{
              padding: '10px 20px', borderRadius: 6, border: '1px solid var(--color-border)',
              backgroundColor: 'transparent', color: 'var(--color-text-primary)',
              fontWeight: 500, cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            style={{
              padding: '10px 20px', borderRadius: 6, border: 'none',
              backgroundColor: 'var(--color-primary)', color: 'white',
              fontWeight: 500, cursor: isSaving ? 'not-allowed' : 'pointer',
              opacity: isSaving ? 0.7 : 1
            }}
          >
            {isSaving ? 'Saving...' : 'Save Content'}
          </button>
        </div>
      </form>
    </div>
  );
}
