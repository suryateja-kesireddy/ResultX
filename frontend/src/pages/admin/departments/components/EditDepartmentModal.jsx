import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Building2, X } from "lucide-react";

import {
    updateDepartment,
} from "../../../../services/department/departmentService";

import {
    getAllCourses,
} from "../../../../services/course/courseService";


export default function EditDepartmentModal({
    open,
    onClose,
    onSuccess,
    department,
}) {

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        courseId: "",
        name: "",
        code: "",
    });


    /* =====================================================
       LOAD COURSES
    ===================================================== */

    useEffect(() => {

        if (open) {
            loadCourses();
        }

    }, [open]);


    const loadCourses = async () => {

        try {

            const data = await getAllCourses();

            setCourses(data || []);

        } catch (error) {

            console.error(
                "Failed to load courses:",
                error
            );

        }

    };


    /* =====================================================
       LOAD DEPARTMENT DATA
    ===================================================== */

    useEffect(() => {

        if (department) {

            setFormData({

                courseId:
                    department.courseId ??
                    department.course?.id ??
                    "",

                name:
                    department.name || "",

                code:
                    department.code || "",

            });

        }

    }, [department]);


    /* =====================================================
       HANDLE INPUT
    ===================================================== */

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


    /* =====================================================
       DEPARTMENT NAME CHANGE
    ===================================================== */

    const handleNameChange = (e) => {

        const name = e.target.value;

        setFormData((prev) => ({

            ...prev,

            name,

            code:
                name
                    .toUpperCase()
                    .replace(/\s+/g, ""),

        }));

    };


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!department) {
            return;
        }


        try {

            setLoading(true);


            await updateDepartment(
                department.id,
                {
                    courseId:
                        Number(formData.courseId),

                    name:
                        formData.name,

                    code:
                        formData.code,
                }
            );


            if (onSuccess) {
                await onSuccess();
            }


            onClose();


        } catch (error) {

            console.error(
                "Failed to update department:",
                error
            );

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update department"
            );

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       CLOSED
    ===================================================== */

    if (!open || !department) {
        return null;
    }


    /* =====================================================
       MODAL
    ===================================================== */

    return createPortal(

        <div
            className="department-modal-overlay"
            onMouseDown={(e) => {

                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {

                    onClose();

                }

            }}
        >

            <div className="department-modal">


                {/* =========================================
                   HEADER
                ========================================= */}

                <div className="department-modal-header">

                    <div className="department-modal-title">

                        <div className="department-modal-icon">

                            <Building2 size={22} />

                        </div>

                        <div>

                            <h2>
                                Edit Department
                            </h2>

                            <p>
                                Update department information
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="department-modal-close"
                        onClick={onClose}
                        disabled={loading}
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* =========================================
                   FORM
                ========================================= */}

                <form
                    className="department-modal-form"
                    onSubmit={handleSubmit}
                >


                    {/* Course */}

                    <div className="department-form-group">

                        <label>
                            Course
                            <span>*</span>
                        </label>

                        <select
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        >

                            <option value="">
                                Select Course
                            </option>

                            {courses.map(
                                (course) => (

                                    <option
                                        key={course.id}
                                        value={course.id}
                                    >

                                        {course.name}

                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* Department Name */}

                    <div className="department-form-group">

                        <label>
                            Department Name
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter department name"
                            value={formData.name}
                            onChange={handleNameChange}
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* Department Code */}

                    <div className="department-form-group">

                        <label>
                            Department Code
                        </label>

                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            disabled={loading}
                        />

                    </div>


                    {/* =====================================
                       ACTIONS
                    ===================================== */}

                    <div className="department-modal-actions">

                        <button
                            type="button"
                            className="department-cancel-btn"
                            onClick={onClose}
                            disabled={loading}
                        >

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="department-update-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Updating..."
                                : "Update Department"}

                        </button>

                    </div>

                </form>

            </div>

        </div>,

        document.body

    );

}