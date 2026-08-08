import { TriangleAlert } from "lucide-react";
import { createPortal } from "react-dom";

import {
  deleteSemester,
} from "../../../../services/semester/semesterService";

export default function DeleteSemesterModal({
  open,
  onClose,
  onSuccess,
  semester,
}) {

  const handleDelete = async () => {

    try {

      await deleteSemester(
        semester.id
      );

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

    }

  };

  if (!open || !semester) return null;

return createPortal(

  <div className="semester-delete-overlay">

    <div className="semester-delete-modal">

      {/* Icon */}

      <div className="semester-delete-icon">
        <TriangleAlert size={34} />
      </div>

      {/* Title */}

      <h2>
        Delete Semester
      </h2>

      {/* Message */}

      <p>
        You are about to permanently delete
      </p>

      <h3>
        Semester {semester.number}
      </h3>

      <span>
        This action cannot be undone.
      </span>

      {/* Buttons */}

      <div className="semester-delete-actions">

        <button
          className="semester-btn-cancel"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          className="semester-btn-delete"
          onClick={handleDelete}
        >
          Delete Semester
        </button>

      </div>

    </div>

  </div>,

  document.body

);

}