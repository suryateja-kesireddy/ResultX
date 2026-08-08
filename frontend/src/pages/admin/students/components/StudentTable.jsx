import StudentRow from "./StudentRow";
import { GraduationCap } from "lucide-react";

export default function StudentTable({
    students,
    onRefresh,
}) {

    return (

        <div className="student-table-card">

            {/* ================= Header ================= */}

            <div className="student-table-header">

                <div>

                    <h2>Student List</h2>

                    <p>
                        Manage all students of
                        SRK Institute of Technology.
                    </p>

                </div>

            </div>

            {/* ================= Table ================= */}

            <div className="table-responsive">

                <table className="student-table">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Student</th>

                            <th>Hall Ticket</th>

                            <th>Department</th>

                            <th>Semester</th>

                            <th>Phone</th>

                            <th>Email</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {students.length === 0 ? (

                            <tr>

                                <td colSpan="8">

                                    <div className="student-empty">

                                        <GraduationCap size={60} />

                                        <h3>No Students Found</h3>

                                        <p>

                                            Click
                                            <strong> Add Student </strong>
                                            to create your first student.

                                        </p>

                                    </div>

                                </td>

                            </tr>

                        ) : (

                            students.map((student, index) => (

                                <StudentRow
                                    key={student.id}
                                    index={index}
                                    student={student}
                                    onRefresh={onRefresh}
                                />

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}