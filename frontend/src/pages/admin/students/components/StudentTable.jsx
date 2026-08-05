import StudentRow from "./StudentRow";

export default function StudentTable({
  students,
}) {

  if (students.length === 0) {
    return (
      <div className="empty-table">
        No students found.
      </div>
    );
  }

  return (
    <div className="student-table-wrapper">

      <table className="student-table">

        <thead>

          <tr>

            <th>Name</th>

            <th>Hall Ticket</th>

            <th>Department</th>

            <th>Semester</th>

            <th>Phone</th>

            <th>Email</th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}