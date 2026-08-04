const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color = "#2563EB",
}) => {
  return (
    <div className="rx-stat-card">

      <div
        className="rx-stat-icon"
        style={{ background: color }}
      >
        <Icon size={24} color="white" />
      </div>

      <div className="rx-stat-content">

        <span className="rx-stat-title">
          {title}
        </span>

        <h2>{value}</h2>

        <p>{subtitle}</p>

      </div>

    </div>
  );
};

export default StatCard;