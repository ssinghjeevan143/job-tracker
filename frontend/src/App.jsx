import { useEffect, useState, useCallback } from 'react'
import { getApplications, getStats } from './api/applications'
import StatsBar from './components/StatsBar'
import ApplicationForm from './components/ApplicationForm'
import ApplicationList from './components/ApplicationList'

const STATUSES = ['ALL', 'APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED']

export default function App() {
  const [applications, setApplications] = useState([])
  const [stats, setStats] = useState(null)
  const [filter, setFilter] = useState('ALL')
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    try {
      const [apps, s] = await Promise.all([
        getApplications(filter === 'ALL' ? null : filter),
        getStats(),
      ])
      setApplications(apps)
      setStats(s)
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }, [filter])

  useEffect(() => { refresh() }, [refresh])

  return (
    <div className="container">
      <header>
        <h1>Job Application Tracker</h1>
        <p>Keep every application, interview and offer in one place.</p>
      </header>

      {error && <div className="error">{error} — is the Spring Boot API running on :8080?</div>}

      <StatsBar stats={stats} />

      <nav className="filters">
        {STATUSES.map((s) => (
          <button
            key={s}
            className={filter === s ? 'chip active' : 'chip'}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </nav>

      <main>
        <ApplicationForm
          editing={editing}
          onDone={() => { setEditing(null); refresh() }}
          onCancel={() => setEditing(null)}
        />
        <ApplicationList
          applications={applications}
          onEdit={setEditing}
          onChanged={refresh}
        />
      </main>
    </div>
  )
}
