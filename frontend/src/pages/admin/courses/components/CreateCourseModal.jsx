import { useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, X } from "lucide-react";
import toast from "react-hot-toast";

import {
    createCourse,
} from "../../../../services/course/courseService";

export default function CreateCourseModal({
    open,
    onClose,
    onSuccess,
}) {

    // =====================================================
    // FORM STATE
    // =====================================================

    const [formData, setFormData] = useState({
        name: "",
        duration: "",
    });


    // =====================================================
    // LOADING STATE
    // =====================================================

    const [loading, setLoading] =
        useState(false);


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

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


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setFormData({
            name: "",
            duration: "",
        });
    };


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const handleClose = () => {

        // Don't allow closing while creating
        if (loading) {
            return;
        }

        resetForm();

        onClose();
    };


    // =====================================================
    // CREATE COURSE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // =================================================
        // PREVENT MULTIPLE SUBMISSIONS
        // =================================================

        if (loading) {
            return;
        }


        // =================================================
        // FRONTEND VALIDATION
        // =================================================

        const courseName =
            formData.name.trim();

        if (!courseName) {

            toast.error(
                "Please enter course name"
            );

            return;
        }


        if (!formData.duration) {

            toast.error(
                "Please enter course duration"
            );

            return;
        }


        const duration =
            Number(formData.duration);


        if (
            !Number.isInteger(duration) ||
            duration < 1 ||
            duration > 10
        ) {

            toast.error(
                "Course duration must be between 1 and 10 years"
            );

            return;
        }


        // =================================================
        // START LOADING
        // =================================================

        setLoading(true);


        try {

            // =================================================
            // API REQUEST
            // =================================================

            await createCourse({

                name: courseName,

                duration: duration,

            });


            // =================================================
            // SUCCESS TOAST
            // =================================================

            toast.success(
                "Course created successfully",
                {
                    duration: 3000,
                }
            );


            // =================================================
            // RESET
            // =================================================

            resetForm();


            // =================================================
            // REFRESH COURSE LIST
            // =================================================

            if (onSuccess) {
                onSuccess();
            }


            // =================================================
            // CLOSE MODAL
            // =================================================

            onClose();

        } catch (error) {

            console.error(
                "Failed to create course:",
                error
            );


            // =================================================
            // GET BACKEND MESSAGE
            // =================================================

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create course";


            const lowerMessage =
                message.toLowerCase();


            // =================================================
            // DUPLICATE COURSE
            // =================================================

            if (
                lowerMessage.includes(
                    "course already exists"
                ) ||
                lowerMessage.includes(
                    "name already exists"
                ) ||
                lowerMessage.includes(
                    "already exists"
                )
            ) {

                toast.error(
                    "Course already exists",
                    {
                        duration: 3500,
                    }
                );

            }

            // =================================================
            // OTHER BACKEND ERROR
            // =================================================

            else {

                toast.error(
                    message,
                    {
                        duration: 3500,
                    }
                );
            }

        } finally {

            // =================================================
            // STOP LOADING
            // =================================================

            setLoading(false);
        }
    };


    // =====================================================
    // DON'T RENDER WHEN CLOSED
    // =====================================================

    if (!open) {
        return null;
    }


    // =====================================================
    // MODAL
    // =====================================================

    return createPortal(

        <div
            className="course-modal-overlay"
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
                className="course-modal"
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="course-modal-header">

                    <div className="course-modal-title">

                        <div className="course-modal-icon">
                            <BookOpen size={24} />
                        </div>

                        <div>

                            <h2>
                                Create Course
                            </h2>

                            <p>
                                Add a new course to your college
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        CLOSE BUTTON
                    ================================================= */}

                    <button
                        type="button"
                        className="course-modal-close"
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
                    className="course-modal-form"
                    onSubmit={handleSubmit}
                >

                    {/* =================================================
                        COURSE NAME
                    ================================================= */}

                    <div className="course-form-group">

                        <label>
                            Course Name
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter course name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={loading}
                            autoFocus
                            required
                        />

                    </div>


                    {/* =================================================
                        DURATION
                    ================================================= */}

                    <div className="course-form-group">

                        <label>
                            Duration
                            <span>*</span>
                        </label>

                        <div className="course-duration-wrapper">

                            <input
                                type="number"
                                name="duration"
                                placeholder="Enter duration"
                                value={formData.duration}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                disabled={loading}
                                required
                            />

                            <span>
                                Years
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="course-modal-actions">

                        {/* CANCEL */}

                        <button
                            type="button"
                            className="course-cancel-btn"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>


                        {/* CREATE */}

                        <button
                            type="submit"
                            className="course-update-btn"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="course-spinner" />

                                    Creating Course...
                                </>
                            ) : (
                                <>
                                    <BookOpen size={18} />

                                    Create Course
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