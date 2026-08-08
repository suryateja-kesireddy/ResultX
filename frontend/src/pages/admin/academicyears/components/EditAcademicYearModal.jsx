import { useEffect, useState } from "react";
import { CalendarClock, CheckCircle2 } from "lucide-react";

import {
  updateAcademicYear,
} from "../../../../services/academicYear/academicYearService";

export default function EditAcademicYearModal({
  open,
  onClose,
  onSuccess,
  academicYear,
}) {

  const [formData, setFormData] = useState({
    year: "",
    isCurrent: false,
  });

  useEffect(() => {

    if (academicYear) {

      setFormData({
        year: academicYear.year,
        isCurrent: academicYear.isCurrent,
      });

    }

  }, [academicYear]);

  const handleChange = (e) => {

    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateAcademicYear(
        academicYear.id,
        formData
      );

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

    }

  };

  if (!open || !academicYear) return null;

  return (

    <div className="academic-modal-overlay">

      <div className="academic-modal">

        {/* Header */}

        <div className="academic-modal-header">

          <div className="academic-modal-icon">

            <CalendarClock size={30} />

          </div>

          <div>

            <h2>Edit Academic Year</h2>

            <p>

              Update academic year details for
              SRK Institute of Technology.

            </p>

          </div>

        </div>

        {/* Form */}

        <form
          className="academic-form"
          onSubmit={handleSubmit}
        >

          <div className="academic-form-group">

            <label>

              Academic Year

            </label>

            <input
              type="text"
              name="year"
              placeholder="Example : 2026-2027"
              value={formData.year}
              onChange={handleChange}
              required
            />

          </div>

          <div className="academic-checkbox-card">

            <label className="academic-checkbox">

              <input
                type="checkbox"
                name="isCurrent"
                checked={formData.isCurrent}
                onChange={handleChange}
              />

              <div>

                <h4>

                  <CheckCircle2 size={18} />

                  Set as Current Academic Year

                </h4>

                <p>

                  Mark this as the active academic
                  session for the institution.

                </p>

              </div>

            </label>

          </div>

          {/* Footer */}

          <div className="academic-modal-footer">

            <button
              type="button"
              className="academic-btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="academic-btn-save"
            >
              Update Academic Year
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}