import {
  Pencil,
  Trash2,
} from "lucide-react";

import FacultyAvatar from "./FacultyAvatar";

export default function FacultyRow({
  faculty,
  onEdit,
  onDelete,
}) {

  return (

    <tr>

      <td>

        <FacultyAvatar faculty={faculty} />

      </td>

      <td>

        <strong>{faculty.employeeId}</strong>

      </td>

      <td>

        {faculty.department.name}

      </td>

      <td>

        {faculty.qualification || "-"}

      </td>

      <td>

        {faculty.experience
          ? `${faculty.experience} Years`
          : "-"}

      </td>

      <td>

        <span
          className={
            faculty.user.isActive
              ? "status-active"
              : "status-inactive"
          }
        >
          {faculty.user.isActive
            ? "Active"
            : "Inactive"}
        </span>

      </td>

      <td>

        <div className="faculty-actions">

          <button
            className="faculty-edit-btn"
            onClick={() => onEdit(faculty)}
          >
            <Pencil size={18} />
          </button>

          <button
            className="faculty-delete-btn"
            onClick={() => onDelete(faculty)}
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>

  );

}