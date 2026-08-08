import { motion } from "framer-motion";

export default function DepartmentCard({
  title,
  students,
  faculties,
  hods,
  subjects,
  icon,
  color,
  active,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className={`department-card ${active ? "active" : ""}`}
      style={{
        "--card-color": color,
      }}
      onClick={onClick}
    >
      <div className="department-card-icon">
        {icon}
      </div>

      <div className="department-card-content">

        <h3>{title}</h3>

        <div className="department-card-stats">

          <span>{students} Students</span>

          <span>{faculties} Faculty</span>

          <span>{hods} HOD</span>

          <span>{subjects} Subjects</span>

        </div>

      </div>
    </motion.div>
  );
}