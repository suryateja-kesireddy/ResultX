import { motion } from "framer-motion";

export default function StudentStatCard({
  icon,
  title,
  count,
  subtitle,
  color,
  active,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className={`student-stat-card ${active ? "active" : ""}`}
      onClick={onClick}
      style={{
        "--card-color": color,
      }}
    >
      <div
        className="student-stat-icon"
        style={{
          background: `${color}15`,
          color,
        }}
      >
        {icon}
      </div>

      <div className="student-stat-content">
        <h4>{title}</h4>

        <h2>{count}</h2>

        <span>{subtitle}</span>
      </div>
    </motion.div>
  );
}