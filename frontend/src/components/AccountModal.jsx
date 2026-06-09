import { useState, useEffect } from 'react';
import { platformsApi } from '../api';

export default function AccountModal({ isOpen, onClose, onSave, initialData }) {
  const isEditMode = Boolean(initialData);

  const [platforms, setPlatforms] = useState([]);
  const [formData, setFormData] = useState({
    platformId: '',
    username: '',
    displayName: '',
    profileUrl: '',
    status: 'Active',
    notes: '',
    credential: {
      password: '',
      recoveryEmail: '',
      recoveryPhone: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      platformsApi.getAll().then(res => setPlatforms(res.data));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          platformId: initialData.platformId?._id || initialData.platformId || '',
          username: initialData.username || '',
          displayName: initialData.displayName || '',
          profileUrl: initialData.profileUrl || '',
          status: initialData.status || 'Active',
          notes: initialData.notes || '',
          credential: {
            password: initialData.credential?.password || '',
            recoveryEmail: initialData.credential?.recoveryEmail || '',
            recoveryPhone: initialData.credential?.recoveryPhone || ''
          }
        });
      } else {
        setFormData({
          platformId: '',
          username: '',
          displayName: '',
          profileUrl: '',
          status: 'Active',
          notes: '',
          credential: {
            password: '',
            recoveryEmail: '',
            recoveryPhone: ''
          }
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('cred_')) {
      const field = name.replace('cred_', '');
      setFormData(prev => ({
        ...prev,
        credential: { ...prev.credential, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: 'var(--color-bg-base)',
    border: '1px solid var(--color-border)',
    borderRadius: 6,
    color: 'var(--color-text-primary)',
    marginBottom: 16
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--color-bg-card)',
        padding: 32,
        borderRadius: 12,
        width: '100%',
        maxWidth: 500,
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid var(--color-border)'
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
          {isEditMode ? 'Edit Account' : 'Add Account'}
        </h2>
        <form onSubmit={handleSubmit}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Platform *</label>
              <select name="platformId" value={formData.platformId} onChange={handleChange} required style={inputStyle}>
                <option value="">Select Platform</option>
                {platforms.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Username / Handle *</label>
            <input name="username" value={formData.username} onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Display Name</label>
              <input name="displayName" value={formData.displayName} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Profile URL</label>
              <input name="profileUrl" value={formData.profileUrl} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginTop: 16, marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 12, borderBottom: '1px solid var(--color-border)', paddingBottom: 4 }}>
              Credentials
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Password</label>
                <input type="text" name="cred_password" value={formData.credential.password} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Recovery Email</label>
                <input type="text" name="cred_recoveryEmail" value={formData.credential.recoveryEmail} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Recovery Phone</label>
              <input type="text" name="cred_recoveryPhone" value={formData.credential.recoveryPhone} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} style={{...inputStyle, height: 60, resize: 'vertical'}} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', background: 'none', border: '1px solid var(--color-border)', borderRadius: 6, color: 'var(--color-text-primary)', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" style={{ padding: '8px 16px', backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: 6, color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
              {isEditMode ? 'Save Changes' : 'Add Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
