import { useState } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";

import {
  createAcademicYear,
} from "../../../../services/academicYear/academicYearService";

export default function CreateAcademicYearModal({
  open,
  onClose,
  onSuccess,
}) {

  const [formData, setFormData] = useState({
    year: "",
    isCurrent: false,
  });

  const handleChange = (e) => {

    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createAcademicYear(formData);

      setFormData({
        year: "",
        isCurrent: false,
      });

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

    }

  };

  if (!open) return null;

  return (

    <div className="academic-modal-overlay">

      <div className="academic-modal">

        {/* Header */}

        <div className="academic-modal-header">

          <div className="academic-modal-icon">

            <CalendarDays size={30} />

          </div>

          <div>

            <h2>Create Academic Year</h2>

            <p>
              Add a new academic year for SRK Institute of Technology.
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

                  This academic year will become the active session.

                </p>

              </div>

            </label>

          </div>

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
              Create Academic Year
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}