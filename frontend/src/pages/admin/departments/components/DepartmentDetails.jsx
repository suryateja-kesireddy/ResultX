import {
    GraduationCap,
    Users,
    UserCheck,
    BookOpen,
    Building2,
} from "lucide-react";


export default function DepartmentDetails({
    department,
    onEdit,
    onDelete,
}) {

    if (!department) {
        return null;
    }


    return (

        <div className="department-details">


            {/* =========================================
                HEADER
            ========================================= */}

            <div className="department-details-header">

                <div className="department-details-icon">

                    <Building2 size={34} />

                </div>


                <div>

                    <h2>
                        {department.name}
                    </h2>

                    <p>
                        Department Information
                    </p>

                </div>

            </div>


            {/* =========================================
                DETAILS
            ========================================= */}

            <div className="department-details-grid">


                <div className="department-detail-card">

                    <GraduationCap size={24} />

                    <div>

                        <span>
                            Course
                        </span>

                        <h4>
                            {department.course || "-"}
                        </h4>

                    </div>

                </div>


                <div className="department-detail-card">

                    <Users size={24} />

                    <div>

                        <span>
                            Students
                        </span>

                        <h4>
                            {department.students ?? 0}
                        </h4>

                    </div>

                </div>


                <div className="department-detail-card">

                    <UserCheck size={24} />

                    <div>

                        <span>
                            Faculty
                        </span>

                        <h4>
                            {department.faculties ?? 0}
                        </h4>

                    </div>

                </div>


                <div className="department-detail-card">

                    <Building2 size={24} />

                    <div>

                        <span>
                            HOD
                        </span>

                        <h4>
                            {department.hods ?? 0}
                        </h4>

                    </div>

                </div>


                <div className="department-detail-card">

                    <BookOpen size={24} />

                    <div>

                        <span>
                            Subjects
                        </span>

                        <h4>
                            {department.subjects ?? 0}
                        </h4>

                    </div>

                </div>

            </div>


            {/* =========================================
                ACTIONS
            ========================================= */}

            <div className="department-details-actions">

                <button
                    type="button"
                    className="department-edit-btn"
                    onClick={onEdit}
                >
                    Edit Department
                </button>


                <button
                    type="button"
                    className="department-delete-btn"
                    onClick={onDelete}
                >
                    Delete Department
                </button>

            </div>

        </div>

    );

}