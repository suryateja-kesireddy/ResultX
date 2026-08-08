import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { createPortal } from "react-dom";

import {
  updateSemester,
} from "../../../../services/semester/semesterService";

import {
  getAcademicYears,
} from "../../../../services/academicYear/academicYearService";

export default function EditSemesterModal({
  open,
  onClose,
  onSuccess,
  semester,
}) {

  const [academicYears, setAcademicYears] = useState([]);

  const [formData, setFormData] = useState({
    type: "",
    academicYearId: "",
  });


  // ==========================================
  // Load Academic Years
  // ==========================================

  useEffect(() => {

    if (open) {
      loadAcademicYears();
    }

  }, [open]);


  // ==========================================
  // Load Selected Semester
  // ==========================================

  useEffect(() => {

    if (semester) {

      setFormData({

        type: semester.type || "",

        academicYearId:
          semester.academicYear?.id || "",

      });

    }

  }, [semester]);


  // ==========================================
  // Get Academic Years
  // ==========================================

  const loadAcademicYears = async () => {

    try {

      const data = await getAcademicYears();

      setAcademicYears(data);

    } catch (error) {

      console.error(
        "Failed to load academic years:",
        error
      );

    }

  };


  // ==========================================
  // Handle Change
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateSemester(

        semester.id,

        {
          // IMPORTANT:
          // Semester number is NOT sent.

          type: formData.type,

          academicYearId:
            Number(formData.academicYearId),
        }

      );

      onSuccess();

      onClose();

    } catch (error) {

      console.error(
        "Failed to update semester:",
        error
      );

    }

  };


  // ==========================================
  // Don't Render
  // ==========================================

  if (!open || !semester) {
    return null;
  }


  // ==========================================
  // Modal
  // ==========================================

  return createPortal(

    <div
      className="semester-modal-overlay"
      onMouseDown={(e) => {

        if (e.target === e.currentTarget) {
          onClose();
        }

      }}
    >

      <div
        className="semester-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >

        {/* ==================================
            HEADER
        ================================== */}

        <div className="semester-modal-header">

          <div className="semester-modal-icon">

            <CalendarClock size={30} />

          </div>

          <div>

            <h2>
              Edit Semester
            </h2>

            <p>
              Update semester details for
              SRK Institute of Technology.
            </p>

          </div>

        </div>


        {/* ==================================
            FORM
        ================================== */}

        <form
          className="semester-form"
          onSubmit={handleSubmit}
        >


          {/* ==================================
              SEMESTER NUMBER
              READ ONLY
          ================================== */}

          <div className="semester-form-group">

            <label>
              Semester Number
            </label>

            <div className="semester-readonly-field">

              Semester {semester.number}

            </div>

          </div>


          {/* ==================================
              SEMESTER TYPE
          ================================== */}

          <div className="semester-form-group">

            <label>
              Semester Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Type
              </option>

              <option value="ODD">
                ODD
              </option>

              <option value="EVEN">
                EVEN
              </option>

            </select>

          </div>


          {/* ==================================
              ACADEMIC YEAR
          ================================== */}

          <div className="semester-form-group">

            <label>
              Academic Year
            </label>

            <select
              name="academicYearId"
              value={formData.academicYearId}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Academic Year
              </option>

              {academicYears.map((year) => (

                <option
                  key={year.id}
                  value={year.id}
                >

                  {year.year}

                </option>

              ))}

            </select>

          </div>


          {/* ==================================
              FOOTER
          ================================== */}

          <div className="semester-modal-footer">

            <button
              type="button"
              className="semester-btn-cancel"
              onClick={onClose}
            >

              Cancel

            </button>

            <button
              type="submit"
              className="semester-btn-save"
            >

              Update Semester

            </button>

          </div>

        </form>

      </div>

    </div>,

    document.body

  );

}