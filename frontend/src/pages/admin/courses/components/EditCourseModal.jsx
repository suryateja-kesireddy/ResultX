import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, X } from "lucide-react";

import { updateCourse } from "../../../../services/course/courseService";

export default function EditCourseModal({
    open,
    onClose,
    onSuccess,
    course,
}) {
    const [formData, setFormData] = useState({
        name: "",
        duration: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (course) {
            setFormData({
                name: course.name || "",
                duration: course.duration || "",
            });
        }
    }, [course]);

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
            setLoading(true);

            await updateCourse(course.id, {
                name: formData.name,
                duration: Number(formData.duration),
            });

            onSuccess();
            onClose();

        } catch (error) {
            console.error(
                "Failed to update course:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    if (!open || !course) {
        return null;
    }

    return createPortal(
        <div
            className="course-modal-overlay"
            onMouseDown={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >

            <div className="course-modal">

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="course-modal-header">

                    <div className="course-modal-title">

                        <div className="course-modal-icon">
                            <BookOpen size={24} />
                        </div>

                        <div>
                            <h2>
                                Edit Course
                            </h2>

                            <p>
                                Update course information
                            </p>
                        </div>

                    </div>


                    <button
                        type="button"
                        className="course-modal-close"
                        onClick={onClose}
                        disabled={loading}
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                    className="course-modal-form"
                    onSubmit={handleSubmit}
                >

                    {/* Course Name */}

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
                            required
                        />

                    </div>


                    {/* Duration */}

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
                                min="1"
                                max="10"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                            />

                            <span>
                                Years
                            </span>

                        </div>

                    </div>


                    {/* ==================================================
                        ACTIONS
                    ================================================== */}

                    <div className="course-modal-actions">

                        <button
                            type="button"
                            className="course-cancel-btn"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="course-update-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Updating..."
                                : "Update Course"}
                        </button>

                    </div>

                </form>

            </div>

        </div>,

        document.body
    );
}