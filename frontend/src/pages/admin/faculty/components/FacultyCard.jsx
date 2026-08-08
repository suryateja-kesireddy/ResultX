export default function FacultyCard({
  title,
  count,
  icon,
  color,
  active,
  onClick,
}) {
  return (
    <div
      className={`faculty-stat-card ${
        active ? "active" : ""
      }`}
      style={{
        "--card-color": color,
      }}
      onClick={onClick}
    >
      <div
        className="faculty-stat-icon"
        style={{
          background: `${color}18`,
          color,
        }}
      >
        {icon}
      </div>

      <div className="faculty-stat-content">
        <h4>{title}</h4>
        <h2>{count}</h2>
        <span>Faculty Members</span>
      </div>
    </div>
  );
}