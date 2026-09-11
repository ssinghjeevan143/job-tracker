import { useEffect, useState } from 'react'
import { createApplication, updateApplication } from '../api/applications'

const EMPTY = {
  company: '', role: '', location: '', jobUrl: '',
  appliedDate: new Date().toISOString().slice(0, 10),
  status: 'APPLIED', notes: '',
}

export default function ApplicationForm({ editing, onDone, onCancel }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  useEffect(() => { setForm(editing || EMPTY) }, [editing])

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    try {
      if (editing) await updateApplication(editing.id, form)
      else await createApplication(form)
      setForm(EMPTY)
      setError('')
      onDone()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h2>{editing ? 'Edit application' : 'Add application'}</h2>
      {error && <div className="error">{error}</div>}
      <div className="grid">
        <input placeholder="Company *" value={form.company} onChange={set('company')} required />
        <input placeholder="Role *" value={form.role} onChange={set('role')} required />
        <input placeholder="Location" value={form.location} onChange={set('location')} />
        <input placeholder="Job posting URL" value={form.jobUrl} onChange={set('jobUrl')} />
        <label>Applied on
          <input type="date" value={form.appliedDate} onChange={set('appliedDate')} required />
        </label>
        <label>Status
          <select value={form.status} onChange={set('status')}>
            <option>APPLIED</option>
            <option>INTERVIEWING</option>
            <option>OFFER</option>
            <option>REJECTED</option>
          </select>
        </label>
      </div>
      <textarea placeholder="Notes (referrals, contacts, interview prep...)"
        value={form.notes} onChange={set('notes')} rows={3} />
      <div className="actions">
        <button type="submit">{editing ? 'Save changes' : 'Add application'}</button>
        {editing && <button type="button" className="ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}
