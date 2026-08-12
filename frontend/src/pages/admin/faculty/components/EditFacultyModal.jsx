import { useEffect, useState } from "react";

import {
  updateFaculty,
} from "../../../../services/faculty/facultyService";

import {
  getAllDepartments,
} from "../../../../services/department/departmentService";


export default function EditFacultyModal({
  open,
  onClose,
  onSuccess,
  faculty,
}) {
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    departmentId: "",
    isActive: true,
  });


  /* ==========================================================
     LOAD DEPARTMENTS
     ========================================================== */

  useEffect(() => {
    if (open) {
      loadDepartments();
    }
  }, [open]);


  /* ==========================================================
     LOAD FACULTY DATA
     ========================================================== */

  useEffect(() => {
    if (faculty) {
      setFormData({
        name: faculty.user.name,
        email: faculty.user.email,
        phone: faculty.phone || "",
        qualification: faculty.qualification || "",
        experience: faculty.experience || "",
        departmentId: faculty.department.id,
        isActive: faculty.user.isActive,
      });
    }
  }, [faculty]);


  /* ==========================================================
     GET DEPARTMENTS
     ========================================================== */

  const loadDepartments = async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  };


  /* ==========================================================
     HANDLE INPUT CHANGE
     ========================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "isActive"
          ? value === "true"
          : value,
    }));
  };


  /* ==========================================================
     HANDLE UPDATE
     ========================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateFaculty(faculty.id, {
        ...formData,
        experience: Number(formData.experience),
        departmentId: Number(formData.departmentId),
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to update faculty:", error);
    }
  };


  /* ==========================================================
     CLOSE MODAL
     ========================================================== */

  const handleCancel = () => {
    onClose();
  };


  /* ==========================================================
     MODAL CLOSED
     ========================================================== */

  if (!open) {
    return null;
  }


  /* ==========================================================
     UI
     ========================================================== */

  return (
    <div className="faculty-modal-overlay">

      <div className="faculty-modal">

        {/* ================= HEADER ================= */}

        <div className="faculty-modal-header">

          <h2>Edit Faculty</h2>

          <button
            type="button"
            className="faculty-modal-close"
            onClick={handleCancel}
            aria-label="Close"
          >
            ×
          </button>

        </div>


        {/* ================= FORM ================= */}

        <form
          className="faculty-edit-form"
          onSubmit={handleSubmit}
        >

          {/* Name */}

          <div className="faculty-form-group">

            <label>Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* Email */}

          <div className="faculty-form-group">

            <label>Email</label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* Phone */}

          <div className="faculty-form-group">

            <label>Phone Number</label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>


          {/* Qualification */}

          <div className="faculty-form-group">

            <label>Qualification</label>

            <input
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />

          </div>


          {/* Experience */}

          <div className="faculty-form-group">

            <label>Experience</label>

            <input
              name="experience"
              type="number"
              min="0"
              value={formData.experience}
              onChange={handleChange}
            />

          </div>


          {/* Department */}

          <div className="faculty-form-group">

            <label>Department</label>

            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
            >

              {departments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </option>
              ))}

            </select>

          </div>


          {/* Status */}

          <div className="faculty-form-group">

            <label>Status</label>

            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
            >

              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>

            </select>

          </div>


          {/* ================= ACTIONS ================= */}

          <div className="faculty-modal-actions">

            <button
              type="submit"
              className="faculty-submit-btn"
            >
              Update Faculty
            </button>


            <button
              type="button"
              className="faculty-cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}