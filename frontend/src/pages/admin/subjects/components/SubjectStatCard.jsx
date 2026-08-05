import { motion } from "framer-motion";

export default function SubjectStatCard({
  title,
  count,
  subtitle,
  icon,
  color,
  active,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`student-stat-card ${active ? "active" : ""}`}
      onClick={onClick}
      style={{
        borderTop: `4px solid ${color}`,
        cursor: "pointer",
      }}
    >
      <div className="student-stat-icon" style={{ color }}>
        {icon}
      </div>

      <div className="student-stat-content">
        <h3>{count}</h3>

        <h4>{title}</h4>

        <p>{subtitle}</p>
      </div>
    </motion.div>
  );
}