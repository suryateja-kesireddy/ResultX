import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Building2, Plus } from "lucide-react";
import toast from "react-hot-toast";

import { createDepartment } from "../../../../services/department/departmentService";
import { getAllCourses } from "../../../../services/course/courseService";

export default function CreateDepartmentModal({
    open,
    onClose,
    onSuccess,
}) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        courseId: "",
        name: "",
        code: "",
    });

    // =====================================================
    // LOAD COURSES
    // =====================================================

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

            toast.error(
                error?.response?.data?.message ||
                "Failed to load courses"
            );
        }
    };

    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const handleClose = () => {
        if (loading) return;

        setFormData({
            courseId: "",
            name: "",
            code: "",
        });

        onClose();
    };

    // =====================================================
    // CREATE DEPARTMENT
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        // ---------------------------------------------
        // FRONTEND VALIDATION
        // ---------------------------------------------

        if (!formData.courseId) {
            toast.error("Please select a course");
            return;
        }

        if (!formData.name.trim()) {
            toast.error("Please enter department name");
            return;
        }

        if (!formData.code.trim()) {
            toast.error("Please enter department code");
            return;
        }

        try {
            // ---------------------------------------------
            // START LOADING
            // ---------------------------------------------

            setLoading(true);

            // ---------------------------------------------
            // API CALL
            // ---------------------------------------------

            await createDepartment({
                courseId: Number(formData.courseId),
                name: formData.name.trim(),
                code: formData.code.trim().toUpperCase(),
            });

            // ---------------------------------------------
            // SUCCESS TOAST
            // ---------------------------------------------

            toast.success(
                "Department created successfully",
                {
                    duration: 3000,
                }
            );

            // ---------------------------------------------
            // RESET FORM
            // ---------------------------------------------

            setFormData({
                courseId: "",
                name: "",
                code: "",
            });

            // ---------------------------------------------
            // REFRESH DEPARTMENT LIST
            // ---------------------------------------------

            if (onSuccess) {
                onSuccess();
            }

            // ---------------------------------------------
            // CLOSE MODAL
            // ---------------------------------------------

            onClose();

        } catch (error) {
            console.error(
                "Failed to create department:",
                error
            );

            // ---------------------------------------------
            // GET BACKEND ERROR MESSAGE
            // ---------------------------------------------

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create department";

            // ---------------------------------------------
            // EXISTING DEPARTMENT
            // ---------------------------------------------

            if (
                message
                    .toLowerCase()
                    .includes("already exists")
            ) {
                toast.error(
                    "Department already exists",
                    {
                        duration: 3500,
                    }
                );
            } else {
                // -----------------------------------------
                // OTHER ERROR
                // -----------------------------------------

                toast.error(message, {
                    duration: 3500,
                });
            }

        } finally {
            // ---------------------------------------------
            // STOP LOADING
            // ---------------------------------------------

            setLoading(false);
        }
    };

    // =====================================================
    // DON'T RENDER
    // =====================================================

    if (!open) {
        return null;
    }

    // =====================================================
    // MODAL
    // =====================================================

    return createPortal(
        <div
            className="department-modal-overlay"
            onMouseDown={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    handleClose();
                }
            }}
        >

            <div
                className="department-create-modal"
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="department-modal-header">

                    <div className="department-modal-title">

                        <div className="department-modal-icon">
                            <Building2 size={23} />
                        </div>

                        <div>
                            <h2>
                                Create Department
                            </h2>

                            <p>
                                Add a new academic department
                            </p>
                        </div>

                    </div>


                    {/* X */}

                    <button
                        type="button"
                        className="department-modal-close"
                        onClick={handleClose}
                        disabled={loading}
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    className="department-create-form"
                    onSubmit={handleSubmit}
                >

                    {/* COURSE */}

                    <div className="department-form-group">

                        <label>
                            Course
                            <span>*</span>
                        </label>

                        <select
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        >

                            <option value="">
                                Select Course
                            </option>

                            {courses.map((course) => (
                                <option
                                    key={course.id}
                                    value={course.id}
                                >
                                    {course.name}
                                </option>
                            ))}

                        </select>

                    </div>


                    {/* DEPARTMENT NAME */}

                    <div className="department-form-group">

                        <label>
                            Department Name
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter department name"
                            disabled={loading}
                            required
                        />

                    </div>


                    {/* DEPARTMENT CODE */}

                    <div className="department-form-group">

                        <label>
                            Department Code
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="Example: CSE"
                            maxLength={10}
                            disabled={loading}
                            required
                        />

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="department-modal-actions">

                        {/* CANCEL */}

                        <button
                            type="button"
                            className="department-cancel-btn"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>


                        {/* CREATE */}

                        <button
                            type="submit"
                            className="department-create-btn"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="department-spinner" />

                                    Creating Department...
                                </>
                            ) : (
                                <>
                                    <Plus size={18} />

                                    Create Department
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>,

        document.body
    );
}