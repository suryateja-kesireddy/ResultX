function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="dashboard-card stat-card">
      <div className="stat-card-header">
        <div className="stat-icon">{icon}</div>

        <h3>{title}</h3>
      </div>

      <div className="stat-card-body">
        <h2>{value ?? "--"}</h2>

        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default StatCard;