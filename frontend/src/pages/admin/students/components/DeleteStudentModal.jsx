import { createPortal } from "react-dom";
import { TriangleAlert } from "lucide-react";

import {
  deleteStudent,
} from "../../../../services/student/studentService";

export default function DeleteStudentModal({
  open,
  onClose,
  onSuccess,
  student,
}) {

  const handleDelete = async () => {

    try {

      await deleteStudent(student.id);

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

    }

  };

  if (!open || !student) return null;

  return createPortal(

    <div className="student-delete-overlay">

      <div className="student-delete-modal">

        {/* ================= Icon ================= */}

        <div className="student-delete-icon">

          <TriangleAlert size={36} />

        </div>

        {/* ================= Title ================= */}

        <h2>

          Delete Student

        </h2>

        {/* ================= Message ================= */}

        <p>

          You are about to permanently delete

        </p>

        <h3>

          {student.name}

        </h3>

        <span>

          Hall Ticket : {student.hallTicket}

        </span>

        <p className="student-delete-warning">

          This action cannot be undone.

        </p>

        {/* ================= Buttons ================= */}

        <div className="student-delete-actions">

          <button
            type="button"
            className="student-cancel-btn"
            onClick={onClose}
          >

            Cancel

          </button>

          <button
            type="button"
            className="student-delete-btn"
            onClick={handleDelete}
          >

            Delete Student

          </button>

        </div>

      </div>

    </div>,

    document.body

  );

}