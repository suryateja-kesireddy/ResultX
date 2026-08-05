import StudentAvatar from "./StudentAvatar";

export default function StudentRow({
  student,
}) {
  return (
    <tr>

      <td>
        <StudentAvatar
          name={student.name}
          email={student.email}
        />
      </td>

      <td>{student.hallTicket}</td>

      <td>{student.department}</td>

      <td>Semester {student.semester}</td>

      <td>{student.phone || "-"}</td>

      <td>{student.email}</td>

    </tr>
  );
}