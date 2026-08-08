import { motion } from "framer-motion";

export default function CourseCard({
    title,
    departments,
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
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`course-card ${
                active ? "active" : ""
            }`}
            style={{
                "--card-color": color,
            }}
            onClick={onClick}
        >

            {/* ==================================================
                ICON
            ================================================== */}

            <div
                className="course-card-icon"
                style={{
                    color: color,
                    backgroundColor: `${color}12`,
                }}
            >
                {icon}
            </div>


            {/* ==================================================
                CONTENT
            ================================================== */}

            <div className="course-card-content">

                <h3 title={title}>
                    {title}
                </h3>


                {/* ==================================================
                    STATISTICS
                ================================================== */}

                <div className="course-card-stats">

                    <div className="course-card-stat">
                        <span>
                            Departments
                        </span>

                        <strong>
                            {departments ?? 0}
                        </strong>
                    </div>


                    <div className="course-card-stat">
                        <span>
                            Students
                        </span>

                        <strong>
                            {students ?? 0}
                        </strong>
                    </div>


                    <div className="course-card-stat">
                        <span>
                            Faculty
                        </span>

                        <strong>
                            {faculties ?? 0}
                        </strong>
                    </div>


                    <div className="course-card-stat">
                        <span>
                            HODs
                        </span>

                        <strong>
                            {hods ?? 0}
                        </strong>
                    </div>


                    <div className="course-card-stat">
                        <span>
                            Subjects
                        </span>

                        <strong>
                            {subjects ?? 0}
                        </strong>
                    </div>

                </div>

            </div>

        </motion.div>
    );
}