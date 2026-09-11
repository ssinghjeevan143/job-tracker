import { deleteApplication, updateApplication } from '../api/applications'

const NEXT = { APPLIED: 'INTERVIEWING', INTERVIEWING: 'OFFER' }

export default function ApplicationList({ applications, onEdit, onChanged }) {
  if (applications.length === 0)
    return <p className="empty">No applications yet. Add your first one!</p>

  async function advance(app) {
    await updateApplication(app.id, { ...app, status: NEXT[app.status] })
    onChanged()
  }

  async function remove(id) {
    if (confirm('Delete this application?')) {
      await deleteApplication(id)
      onChanged()
    }
  }

  return (
    <ul className="list">
      {applications.map((a) => (
        <li className="card item" key={a.id}>
          <div>
            <strong>{a.role}</strong> @ {a.company}
            <div className="meta">
              {a.location && <span>{a.location} · </span>}
              applied {a.appliedDate}
              {a.jobUrl && <> · <a href={a.jobUrl} target="_blank" rel="noreferrer">posting</a></>}
            </div>
            {a.notes && <p className="notes">{a.notes}</p>}
          </div>
          <div className="item-actions">
            <span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span>
            {NEXT[a.status] && (
              <button className="ghost" onClick={() => advance(a)}>→ {NEXT[a.status]}</button>
            )}
            <button className="ghost" onClick={() => onEdit(a)}>Edit</button>
            <button className="ghost danger" onClick={() => remove(a.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
