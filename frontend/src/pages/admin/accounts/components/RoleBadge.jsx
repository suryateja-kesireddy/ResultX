export default function RoleBadge({ role }) {
  const roleConfig = {
    STUDENT: {
      label: "Student",
      className: "student",
    },

    HOD: {
      label: "HOD",
      className: "hod",
    },

    EXAM_CELL: {
      label: "Exam Cell",
      className: "examcell",
    },

    ADMIN: {
      label: "Admin",
      className: "admin",
    },
  };

  const currentRole = roleConfig[role] || {
    label: role,
    className: "",
  };

  return (
    <span className={`role-badge ${currentRole.className}`}>
      {currentRole.label}
    </span>
  );
}