import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { clientsApi, categoriesApi, tagsApi } from '../api';

export default function ClientFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Dropdown data
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [formData, setFormData] = useState({
    fullName: '',
    categoryId: '',
    tagIds: [],
    status: 'Active',
    rating: 5,
    ratingNote: '',
    email: '',
    phone: '',
    whatsapp: '',
    dob: '',
    address: ''
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [catRes, tagsRes] = await Promise.all([
          categoriesApi.getAll(),
          tagsApi.getAll()
        ]);
        setCategories(catRes.data);
        setTags(tagsRes.data);
      } catch (err) {
        console.error('Failed to fetch metadata', err);
      }
    };
    fetchMetadata();
  }, []);

  useEffect(() => {
    if (!isEditMode) return;
    
    const fetchClient = async () => {
      try {
        const res = await clientsApi.getById(id);
        const c = res.data;
        setFormData({
          fullName: c.personalInfo?.fullName || '',
          categoryId: c.categoryId?._id || c.categoryId || '',
          tagIds: c.tagIds?.map(t => t._id || t) || [],
          status: c.status || 'Active',
          rating: c.rating || 5,
          ratingNote: c.ratingNote || '',
          email: c.personalInfo?.email || '',
          phone: c.personalInfo?.phone || '',
          whatsapp: c.personalInfo?.whatsapp || '',
          dob: c.personalInfo?.dob ? new Date(c.personalInfo.dob).toISOString().split('T')[0] : '',
          address: c.personalInfo?.address || ''
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClient();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tagId) => {
    setFormData(prev => {
      const isSelected = prev.tagIds.includes(tagId);
      if (isSelected) {
        return { ...prev, tagIds: prev.tagIds.filter(id => id !== tagId) };
      } else {
        return { ...prev, tagIds: [...prev.tagIds, tagId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    const payload = {
      personalInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        dob: formData.dob || undefined,
        address: formData.address
      },
      categoryId: formData.categoryId || undefined,
      tagIds: formData.tagIds,
      status: formData.status,
      rating: parseInt(formData.rating, 10),
      ratingNote: formData.ratingNote || undefined
    };

    try {
      if (isEditMode) {
        await clientsApi.update(id, payload);
        navigate(`/clients/${id}`); // Redirect to details
      } else {
        const res = await clientsApi.create(payload);
        navigate(`/clients/${res.data._id}`); // Redirect to details
      }
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  };

  if (isLoading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading client data...</div>;

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'var(--color-bg-base)',
    border: '1px solid var(--color-border)',
    borderRadius: 6,
    color: 'var(--color-text-primary)',
    marginBottom: 16
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px' }}>
          {isEditMode ? 'Edit Client' : 'Add New Client'}
        </h1>
        <button 
          type="button" 
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>

      {error && (
        <div style={{ padding: 12, backgroundColor: 'rgba(214, 48, 49, 0.1)', color: '#d63031', borderRadius: 6, marginBottom: 24 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-bg-card)', padding: 32, borderRadius: 10, border: '1px solid var(--color-border)' }}>
        
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>Core Information</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Full Name *</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} required style={inputStyle} placeholder="Jane Doe" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Category</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange} style={inputStyle}>
              <option value="">-- Uncategorized --</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Rating (1-10)</label>
            <input type="number" name="rating" min="1" max="10" value={formData.rating} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Rating Note</label>
          <input type="text" name="ratingNote" value={formData.ratingNote} onChange={handleChange} style={inputStyle} placeholder="Reason for this rating..." />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>Tags</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {tags.map(tag => {
              const isSelected = formData.tagIds.includes(tag._id);
              return (
                <div 
                  key={tag._id} 
                  onClick={() => handleTagToggle(tag._id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 12,
                    fontSize: 12,
                    cursor: 'pointer',
                    backgroundColor: isSelected ? tag.color : 'transparent',
                    color: isSelected ? '#fff' : 'var(--color-text-secondary)',
                    border: `1px solid ${isSelected ? tag.color : 'var(--color-border)'}`,
                    opacity: isSelected ? 1 : 0.6
                  }}
                >
                  {tag.name}
                </div>
              );
            })}
            {tags.length === 0 && <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>No tags available. Manage tags in settings.</span>}
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, marginTop: 32, borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>Contact Details</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="jane@example.com" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="+1 234 567 8900" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>WhatsApp Number</label>
            <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} style={inputStyle} placeholder="+1 234 567 8900" />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} style={{...inputStyle, height: 80, resize: 'vertical'}} placeholder="Full physical address..." />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: 'transparent', 
              border: '1px solid var(--color-border)', 
              borderRadius: 6, 
              color: 'var(--color-text-primary)', 
              cursor: 'pointer' 
            }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSaving}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: 'var(--color-primary)', 
              border: 'none', 
              borderRadius: 6, 
              color: '#fff', 
              fontWeight: 600,
              cursor: isSaving ? 'not-allowed' : 'pointer',
              opacity: isSaving ? 0.7 : 1
            }}
          >
            {isSaving ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Create Client')}
          </button>
        </div>
      </form>
    </div>
  );
}
