/**
 * API helper — all backend calls go through this module.
 * Using the Vite proxy, we don't need to specify the full URL.
 */

const BASE = '/api/v1';

async function request(endpoint, options = {}) {
  const url = `${BASE}${endpoint}`;

  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  // Convert body objects to JSON strings
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    // Throw the error message from the backend
    const message = data?.error?.message || 'Something went wrong';
    throw new Error(message);
  }

  return data;
}

// ---- Categories API ----

export const categoriesApi = {
  getAll: () => request('/categories'),
  create: (body) => request('/categories', { method: 'POST', body }),
  update: (id, body) => request(`/categories/${id}`, { method: 'PUT', body }),
  delete: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
};

// ---- Platforms API ----

export const platformsApi = {
  getAll: () => request('/platforms'),
  create: (body) => request('/platforms', { method: 'POST', body }),
  update: (id, body) => request(`/platforms/${id}`, { method: 'PUT', body }),
  delete: (id) => request(`/platforms/${id}`, { method: 'DELETE' }),
};

// ---- Tags API ----

export const tagsApi = {
  getAll: () => request('/tags'),
  create: (body) => request('/tags', { method: 'POST', body }),
  update: (id, body) => request(`/tags/${id}`, { method: 'PUT', body }),
  delete: (id) => request(`/tags/${id}`, { method: 'DELETE' }),
};

// ---- Content API ----

export const contentApi = {
  getAll: (params) => {
    const query = new URLSearchParams(params).toString();
    return request(`/content${query ? `?${query}` : ''}`);
  },
  getById: (id) => request(`/content/${id}`),
  create: (body) => request('/content', { method: 'POST', body }),
  update: (id, body) => request(`/content/${id}`, { method: 'PUT', body }),
  delete: (id) => request(`/content/${id}`, { method: 'DELETE' }),

  platforms: {
    add: (contentId, body) => request(`/content/${contentId}/platforms`, { method: 'POST', body }),
    update: (contentId, platformId, body) => request(`/content/${contentId}/platforms/${platformId}`, { method: 'PUT', body }),
    delete: (contentId, platformId) => request(`/content/${contentId}/platforms/${platformId}`, { method: 'DELETE' }),
  },

  files: {
    getAll: (contentId) => request(`/content/${contentId}/files`),
    // Note: upload expects a FormData object, so we pass it directly and omit Content-Type header so the browser sets the boundary automatically.
    upload: async (contentId, formData) => {
      const res = await fetch(`${BASE}/content/${contentId}/files`, {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        // Try to extract backend error message, fall back gracefully
        try {
          const errData = await res.json();
          throw new Error(errData?.error?.message || `Upload failed (${res.status})`);
        } catch (parseErr) {
          if (parseErr.message.includes('Upload failed')) throw parseErr;
          throw new Error(`Upload failed (${res.status})`);
        }
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message || 'Upload failed');
      return data;
    },
    delete: (contentId, filePath) => request(`/content/${contentId}/files`, { method: 'DELETE', body: { filePath } }),
  }
};

// ---- Search API ----

export const searchApi = {
  query: (q) => request(`/search?q=${encodeURIComponent(q)}`)
};

// ---- Timeline API ----

export const timelineApi = {
  getEvents: (params) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/timeline${qs ? `?${qs}` : ''}`);
  }
};

// ---- Dashboard API ----

export const dashboardApi = {
  getStats: () => request('/dashboard/stats')
};

// ---- Storage API ----

export const storageApi = {
  getOverview: () => request('/storage/overview'),
  removeMissingFile: (contentId, fileName) => request('/storage/missing-files/remove', { method: 'POST', body: JSON.stringify({ contentId, fileName }) })
};

// ---- Backups API ----

export const backupsApi = {
  export: () => fetch('http://localhost:5000/api/v1/backups/export').then(res => res.blob()), // Download blob
  restoreSummary: (file) => {
    const formData = new FormData();
    formData.append('backup', file);
    return fetch('http://localhost:5000/api/v1/backups/restore/summary', { method: 'POST', body: formData }).then(r => r.json());
  },
  restoreConfirm: (file) => {
    const formData = new FormData();
    formData.append('backup', file);
    return fetch('http://localhost:5000/api/v1/backups/restore/confirm', { method: 'POST', body: formData }).then(r => r.json());
  }
};

// ---- Snapshots API ----

export const snapshotsApi = {
  getSnapshots: () => request('/snapshots'),
  generate: () => request('/snapshots/generate', { method: 'POST' })
};

// ---- Recycle Bin API ----

export const recycleBinApi = {
  getItems: () => request('/recycle-bin'),
  restore: (id, type) => request('/recycle-bin/restore', { method: 'POST', body: JSON.stringify({ id, type }) }),
  hardDelete: (id, type) => request('/recycle-bin/delete', { method: 'POST', body: JSON.stringify({ id, type }) })
};

// ---- Clients API ----

export const clientsApi = {
  getAll: () => request('/clients'),
  getById: (id) => request(`/clients/${id}`),
  checkDuplicate: (name) => request(`/clients/check-duplicate?name=${encodeURIComponent(name)}`),
  create: (body) => request('/clients', { method: 'POST', body }),
  update: (id, body) => request(`/clients/${id}`, { method: 'PUT', body }),
  delete: (id) => request(`/clients/${id}`, { method: 'DELETE' }),

  accounts: {
    add: (clientId, body) => request(`/clients/${clientId}/accounts`, { method: 'POST', body }),
    update: (clientId, accountId, body) => request(`/clients/${clientId}/accounts/${accountId}`, { method: 'PUT', body }),
    delete: (clientId, accountId) => request(`/clients/${clientId}/accounts/${accountId}`, { method: 'DELETE' }),
  },

  notes: {
    add: (clientId, body) => request(`/clients/${clientId}/notes`, { method: 'POST', body }),
    update: (clientId, noteId, body) => request(`/clients/${clientId}/notes/${noteId}`, { method: 'PUT', body }),
    delete: (clientId, noteId) => request(`/clients/${clientId}/notes/${noteId}`, { method: 'DELETE' }),
  }
};
