export default function DepartmentBadge({ department }) {
  const departmentMap = {
    "Master of Computer Applications": "MCA",
    "Computer Science Engineering": "CSE",
    "Electronics and Communication Engineering": "ECE",
    Administration: "Admin",
    "Exam Cell": "Exam Cell",
  };

  const label = departmentMap[department] || department;

  return (
    <span className="department-badge">
      {label}
    </span>
  );
}