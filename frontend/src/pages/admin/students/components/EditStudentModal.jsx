import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { UserPen } from "lucide-react";

import {
  updateStudent,
} from "../../../../services/student/studentService";

import {
  getAllDepartments,
} from "../../../../services/department/departmentService";

import {
  getSemesters,
} from "../../../../services/semester/semesterService";

export default function EditStudentModal({
  open,
  onClose,
  onSuccess,
  student,
}) {

  const [departments, setDepartments] = useState([]);

  const [semesters, setSemesters] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    hallTicket: "",
    phone: "",
    departmentId: "",
    semesterId: "",
    section: "A",
  });

  useEffect(() => {

    if (open) {

      loadData();

    }

  }, [open]);

  useEffect(() => {

    if (student) {

      setFormData({

        name: student.name || "",

        email: student.email || "",

        password: "",

        hallTicket: student.hallTicket || "",

        phone: student.phone || "",

        departmentId:
          student.departmentId ??
          student.department?.id ??
          "",

        semesterId:
          student.semesterId ??
          student.semester?.id ??
          "",

        section: student.section || "A",

      });

    }

  }, [student]);

  const loadData = async () => {

    try {

      const departmentData =
        await getAllDepartments();

      const semesterData =
        await getSemesters();

      setDepartments(departmentData);

      setSemesters(semesterData);

    } catch (error) {

      console.error(error);

    }

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {

        name: formData.name,

        email: formData.email,

        hallTicket: formData.hallTicket,

        phone: formData.phone,

        departmentId: Number(formData.departmentId),

        semesterId: Number(formData.semesterId),

        section: formData.section,

      };

      if (formData.password.trim()) {

        payload.password = formData.password;

      }

      await updateStudent(
        student.id,
        payload
      );

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

    }

  };

  if (!open || !student) return null;

  return createPortal(

    <div className="student-modal-overlay">

      <div className="student-modal">

        {/* Header */}

        <div className="student-modal-header">

          <div className="student-modal-icon">

            <UserPen size={28} />

          </div>

          <div>

            <h2>Edit Student</h2>

            <p>

              Update student details for
              SRK Institute of Technology.

            </p>

          </div>

        </div>

        {/* Form */}

        <form
          className="student-form"
          onSubmit={handleSubmit}
        >

          <div className="student-form-grid">

            <div className="student-form-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="student-form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="student-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Leave blank to keep existing password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

            <div className="student-form-group">

              <label>
                Hall Ticket
              </label>

              <input
                type="text"
                name="hallTicket"
                value={formData.hallTicket}
                onChange={handleChange}
                required
              />

            </div>

            <div className="student-form-group">

              <label>
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            <div className="student-form-group">

              <label>
                Department
              </label>

              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Department
                </option>

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

            <div className="student-form-group">

              <label>
                Semester
              </label>

              <select
                name="semesterId"
                value={formData.semesterId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Semester
                </option>

                {semesters.map((semester) => (

                  <option
                    key={semester.id}
                    value={semester.id}
                  >

                    Semester {semester.number}
                    {" "}
                    ({semester.type})

                  </option>

                ))}

              </select>

            </div>

            <div className="student-form-group">

              <label>
                Section
              </label>

              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
              >

                <option value="A">A</option>

                <option value="B">B</option>

                <option value="C">C</option>

                <option value="D">D</option>

              </select>

            </div>

          </div>

          <div className="student-modal-actions">

            <button
              type="button"
              className="student-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="student-save-btn"
            >
              Update Student
            </button>

          </div>

        </form>

      </div>

    </div>,

    document.body

  );

}