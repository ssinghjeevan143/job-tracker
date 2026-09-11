export default function StatsBar({ stats }) {
  if (!stats) return null
  const cards = [
    { label: 'Total', value: stats.total },
    { label: 'Applied', value: stats.byStatus.APPLIED || 0 },
    { label: 'Interviewing', value: stats.byStatus.INTERVIEWING || 0 },
    { label: 'Offers', value: stats.byStatus.OFFER || 0 },
    { label: 'Rejected', value: stats.byStatus.REJECTED || 0 },
  ]
  return (
    <section className="stats">
      {cards.map((c) => (
        <div className="stat-card" key={c.label}>
          <span className="stat-value">{c.value}</span>
          <span className="stat-label">{c.label}</span>
        </div>
      ))}
    </section>
  )
}
