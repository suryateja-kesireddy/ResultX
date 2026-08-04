function StatCard({ title, value, icon }) {
  return (
    <div className="examcell-stat-card">

      <div className="examcell-stat-icon">
        {icon}
      </div>

      <div>

        <h2>{value}</h2>

        <p>{title}</p>

      </div>

    </div>
  );
}

export default StatCard;