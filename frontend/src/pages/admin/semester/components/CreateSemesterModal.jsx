import { useEffect, useState } from "react";
import { CalendarPlus } from "lucide-react";
import { createPortal } from "react-dom";

import {
  createSemester,
} from "../../../../services/semester/semesterService";

import {
  getAcademicYears,
} from "../../../../services/academicYear/academicYearService";

export default function CreateSemesterModal({
  open,
  onClose,
  onSuccess,
}) {

  const [academicYears, setAcademicYears] = useState([]);

  const [formData, setFormData] = useState({
    number: "",
    type: "",
    academicYearId: "",
  });

  useEffect(() => {

    if (open) {

      loadAcademicYears();

    }

  }, [open]);

  const loadAcademicYears = async () => {

    try {

      const data = await getAcademicYears();

      setAcademicYears(data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createSemester({

        number: Number(formData.number),

        type: formData.type,

        academicYearId: Number(formData.academicYearId),

      });

      setFormData({

        number: "",

        type: "",

        academicYearId: "",

      });

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

    }

  };

  if (!open) return null;

return createPortal(

  <div className="semester-modal-overlay">

    <div className="semester-modal">

      {/* Header */}

      <div className="semester-modal-header">

        <div className="semester-modal-icon">
          <CalendarPlus size={30} />
        </div>

        <div>
          <h2>Create Semester</h2>

          <p>
            Add a new semester for SRK Institute of Technology.
          </p>
        </div>

      </div>

      {/* Form */}

      <form
        className="semester-form"
        onSubmit={handleSubmit}
      >

        <div className="semester-form-group">

          <label>Semester Number</label>

          <select
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Semester
            </option>

            {[1,2,3,4,5,6,7,8].map((semester)=>(
              <option
                key={semester}
                value={semester}
              >
                Semester {semester}
              </option>
            ))}

          </select>

        </div>

        <div className="semester-form-group">

          <label>Semester Type</label>

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

        <div className="semester-form-group">

          <label>Academic Year</label>

          <select
            name="academicYearId"
            value={formData.academicYearId}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Academic Year
            </option>

            {academicYears.map((year)=>(

              <option
                key={year.id}
                value={year.id}
              >
                {year.year}
              </option>

            ))}

          </select>

        </div>

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
            Create Semester
          </button>

        </div>

      </form>

    </div>

  </div>,

  document.body

);

}