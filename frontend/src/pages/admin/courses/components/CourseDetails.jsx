import {
    BookOpen,
    Building2,
    GraduationCap,
    Users,
    UserCheck,
    Clock3,
} from "lucide-react";

export default function CourseDetails({
    course,
    onEdit,
    onDelete,
}) {
    if (!course) {
        return null;
    }
    console.log("COURSE DETAILS:", course);

    return (
        <div className="course-details">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="course-details-header">

                <div
                    className="course-details-icon"
                    style={{
                        color: "#2563eb",
                    }}
                >
                    <BookOpen size={32} />
                </div>

                <div className="course-details-title">

                    <h2>
                        {course.name}
                    </h2>

                    <p>
                        Course Information
                    </p>

                </div>

            </div>


            {/* ==================================================
                DETAILS GRID
            ================================================== */}

            <div className="course-details-grid">

                {/* Departments */}

                <div className="course-detail-card">

                    <Building2 size={22} />

                    <div>
                        <span>
                            Departments
                        </span>

                        <h4>
                            {course.departments ?? 0}
                        </h4>
                    </div>

                </div>


                {/* Students */}

                <div className="course-detail-card">

                    <GraduationCap size={22} />

                    <div>
                        <span>
                            Students
                        </span>

                        <h4>
                            {course.students ?? 0}
                        </h4>
                    </div>

                </div>


                {/* Faculty */}

                <div className="course-detail-card">

                    <Users size={22} />

                    <div>
                        <span>
                            Faculty
                        </span>

                        <h4>
                            {course.faculties ?? 0}
                        </h4>
                    </div>

                </div>


                {/* HODs */}

                <div className="course-detail-card">

                    <UserCheck size={22} />

                    <div>
                        <span>
                            HODs
                        </span>

                        <h4>
                            {course.hods ?? 0}
                        </h4>
                    </div>

                </div>


                {/* Subjects */}

                <div className="course-detail-card">

                    <BookOpen size={22} />

                    <div>
                        <span>
                            Subjects
                        </span>

                        <h4>
                            {course.subjects ?? 0}
                        </h4>
                    </div>

                </div>


                {/* Duration */}

                <div className="course-detail-card">

                    <Clock3 size={22} />

                    <div>
                        <span>
                            Duration
                        </span>

                        <h4>
                            {course.duration ?? 0} Years
                        </h4>
                    </div>

                </div>

            </div>


            {/* ==================================================
                ACTIONS
            ================================================== */}

            <div className="course-details-actions">

                <button
                    type="button"
                    className="course-edit-btn"
                    onClick={() => onEdit(course)}
                >
                    Edit Course
                </button>

                <button
                    type="button"
                    className="course-delete-btn"
                    onClick={() => onDelete(course)}
                >
                    Delete Course
                </button>

            </div>

        </div>
    );
}