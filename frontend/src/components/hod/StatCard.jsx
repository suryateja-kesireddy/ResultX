function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div className="hod-stat-card">

      <div
        className="hod-stat-icon"
        style={{
          background: color,
        }}
      >
      </div>

      <h2>{value}</h2>

      <p>{title}</p>

    </div>
  );
}

export default StatCard;