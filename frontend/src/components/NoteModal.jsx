import { useState, useEffect } from 'react';

export default function NoteModal({ isOpen, onClose, onSave, initialData }) {
  const isEditMode = Boolean(initialData);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isOpen) {
      setContent(initialData?.content || '');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ content });
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
        border: '1px solid var(--color-border)'
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
          {isEditMode ? 'Edit Note' : 'Add Note'}
        </h2>
        <form onSubmit={handleSubmit}>
          
          <div>
            <textarea 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              required 
              autoFocus
              placeholder="Write a note about this client..."
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--color-bg-base)',
                border: '1px solid var(--color-border)',
                borderRadius: 6,
                color: 'var(--color-text-primary)',
                minHeight: 120,
                resize: 'vertical',
                marginBottom: 16
              }} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', background: 'none', border: '1px solid var(--color-border)', borderRadius: 6, color: 'var(--color-text-primary)', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" style={{ padding: '8px 16px', backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: 6, color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
              {isEditMode ? 'Save Note' : 'Add Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
