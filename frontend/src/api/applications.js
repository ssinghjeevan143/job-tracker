// Direct Render ka live URL daal rahe hain
const API_BASE_URL = 'https://job-tracker-backend-75lw.onrender.com';
const BASE = `${API_BASE_URL}/api/applications`;



async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  return res.status === 204 ? null : res.json()
}

export const getApplications = (status) =>
  fetch(status ? `${BASE}?status=${status}` : BASE).then(handle)

export const getStats = () => fetch(`${BASE}/stats`).then(handle)

export const createApplication = (data) =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle)

export const updateApplication = (id, data) =>
  fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle)

export const deleteApplication = (id) =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' }).then(handle)
