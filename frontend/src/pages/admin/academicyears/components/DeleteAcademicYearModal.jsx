import { TriangleAlert } from "lucide-react";

import {
  deleteAcademicYear,
} from "../../../../services/academicYear/academicYearService";

export default function DeleteAcademicYearModal({
  open,
  onClose,
  onSuccess,
  academicYear,
}) {

  const handleDelete = async () => {

    try {

      await deleteAcademicYear(
        academicYear.id
      );

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

    }

  };

  if (!open || !academicYear) return null;

  return (

    <div className="academic-delete-overlay">

      <div className="academic-delete-modal">

        {/* Header */}

        <div className="academic-delete-icon">

          <TriangleAlert size={34} />

        </div>

        <h2>Delete Academic Year</h2>

        <p>

          You are about to permanently delete

        </p>

        <h3>

          {academicYear.year}

        </h3>

        <span>

          This action cannot be undone.

        </span>

        {/* Footer */}

        <div className="academic-delete-actions">

          <button
            className="academic-btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="academic-btn-delete"
            onClick={handleDelete}
          >
            Delete Academic Year
          </button>

        </div>

      </div>

    </div>

  );

}