import { motion } from "framer-motion";

export default function StudentStatCard({
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
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`student-stat-card ${
                active ? "active" : ""
            }`}
            style={{
                "--card-color": color,
            }}
            onClick={onClick}
        >
            <div
                className="student-stat-icon"
                style={{
                    background: `${color}15`,
                    color: color,
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