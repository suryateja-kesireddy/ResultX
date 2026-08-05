export default function SubjectRow({ subject }) {
  return (
    <tr>

      <td>{subject.code}</td>

      <td>{subject.name}</td>

      <td>{subject.department.code}</td>

      <td>
        Semester {subject.semester.number}
      </td>

      <td>{subject.credits}</td>

    </tr>
  );
}