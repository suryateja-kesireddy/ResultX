import { useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Trash2, X } from "lucide-react";

import {
    deleteCourse,
} from "../../../../services/course/courseService";

export default function DeleteCourseModal({
    open,
    onClose,
    onSuccess,
    course,
}) {
    const [loading, setLoading] = useState(false);

    if (!open || !course) {
        return null;
    }

    const handleDelete = async () => {
        try {
            setLoading(true);

            await deleteCourse(course.id);

            onSuccess();
            onClose();

        } catch (error) {
            console.error(
                "Failed to delete course:",
                error
            );

            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete course"
            );

        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div
            className="course-delete-overlay"
            onMouseDown={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >

            <div className="course-delete-modal">

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="course-delete-header">

                    <div className="course-delete-icon">
                        <AlertTriangle size={28} />
                    </div>

                    <button
                        type="button"
                        className="course-delete-close"
                        onClick={onClose}
                        disabled={loading}
                    >
                        <X size={19} />
                    </button>

                </div>


                {/* ==================================================
                    CONTENT
                ================================================== */}

                <div className="course-delete-content">

                    <h2>
                        Delete Course?
                    </h2>

                    <p>
                        Are you sure you want to
                        permanently delete this course?
                    </p>


                    {/* Course Information */}

                    <div className="course-delete-course">

                        <strong>
                            {course.name}
                        </strong>

                        <span>
                            Duration:{" "}
                            {course.duration ?? 0} Years
                        </span>

                    </div>


                    <p className="course-delete-warning">
                        This action cannot be undone.
                        All course-related information
                        may be affected.
                    </p>

                </div>


                {/* ==================================================
                    ACTIONS
                ================================================== */}

                <div className="course-delete-actions">

                    <button
                        type="button"
                        className="course-delete-cancel"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="course-delete-confirm"
                        onClick={handleDelete}
                        disabled={loading}
                    >

                        <Trash2 size={17} />

                        {loading
                            ? "Deleting..."
                            : "Delete Course"}

                    </button>

                </div>

            </div>

        </div>,

        document.body
    );
}