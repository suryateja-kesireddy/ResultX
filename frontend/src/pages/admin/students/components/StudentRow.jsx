import { useState } from "react";
import {
  Pencil,
  Trash2,
} from "lucide-react";

import StudentAvatar from "./StudentAvatar";
import EditStudentModal from "./EditStudentModal";
import DeleteStudentModal from "./DeleteStudentModal";

export default function StudentRow({
  student,
  index,
  onRefresh,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <tr>

        {/* ==================================
            #
        ================================== */}

        <td>
          {index + 1}
        </td>

        {/* ==================================
            STUDENT
        ================================== */}

        <td>
          <StudentAvatar
            name={student.name}
            email={student.email}
          />
        </td>

        {/* ==================================
            HALL TICKET
        ================================== */}

        <td>
          {student.hallTicket || "-"}
        </td>

        {/* ==================================
            DEPARTMENT
        ================================== */}

        <td>
          <span className="student-department-badge">
            {
              student.department?.code ||
              "-"}
          </span>
        </td>

        {/* ==================================
            SEMESTER
        ================================== */}

        <td>
          <span className="student-semester-badge">
            {student.semester?.number || "-"}
          </span>
        </td>

        {/* ==================================
            PHONE
        ================================== */}

        <td>
          {student.phone || "-"}
        </td>

        {/* ==================================
            EMAIL
        ================================== */}

        <td>
          {student.email || "-"}
        </td>

        {/* ==================================
            ACTIONS
        ================================== */}

        <td>
          <div className="action-buttons">

            <button
              type="button"
              className="edit-btn"
              onClick={() => setOpenEdit(true)}
              title="Edit Student"
            >
              <Pencil size={18} />
            </button>

            <button
              type="button"
              className="delete-btn"
              onClick={() => setOpenDelete(true)}
              title="Delete Student"
            >
              <Trash2 size={18} />
            </button>

          </div>
        </td>

      </tr>

      {/* ==================================
          EDIT MODAL
      ================================== */}

      <EditStudentModal
        open={openEdit}
        student={student}
        onClose={() => setOpenEdit(false)}
        onSuccess={onRefresh}
      />

      {/* ==================================
          DELETE MODAL
      ================================== */}

      <DeleteStudentModal
        open={openDelete}
        student={student}
        onClose={() => setOpenDelete(false)}
        onSuccess={onRefresh}
      />
    </>
  );
}