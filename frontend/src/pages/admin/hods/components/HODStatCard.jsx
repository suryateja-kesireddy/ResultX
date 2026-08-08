import { motion } from "framer-motion";

export default function HODStatCard({
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
                borderTop: `4px solid ${color}`,
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <div
                className="student-stat-icon"
                style={{ color }}
            >
                {icon}
            </div>

            <div className="student-stat-content">
                <h3>{count}</h3>

                <h4 title={title}>
                    {title}
                </h4>

                <p>{subtitle}</p>
            </div>
        </motion.div>
    );
}