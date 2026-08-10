import { useState } from "react";
import { createPortal } from "react-dom";
import {
    AlertTriangle,
    Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
    deleteSubject,
} from "../../../../services/subject/subjectService";

export default function DeleteSubjectModal({
    open,
    onClose,
    onSuccess,
    subject,
}) {
    // ==========================================================
    // STATE
    // ==========================================================

    const [loading, setLoading] = useState(false);

    // ==========================================================
    // HANDLE DELETE
    // ==========================================================

    const handleDelete = async () => {

        // ------------------------------------------------------
        // NO SUBJECT
        // ------------------------------------------------------

        if (!subject?.id) {
            toast.error(
                "No subject selected for deletion."
            );
            return;
        }

        // ------------------------------------------------------
        // PREVENT MULTIPLE DELETE ATTEMPTS
        // ------------------------------------------------------

        if (loading) {
            return;
        }

        // ------------------------------------------------------
        // START DELETE REQUEST
        // ------------------------------------------------------

        try {
            setLoading(true);

            await deleteSubject(subject.id);

            // --------------------------------------------------
            // SUCCESS TOAST
            // --------------------------------------------------

            toast.success(
                "Subject deleted successfully!",
                {
                    duration: 3000,
                }
            );

            // --------------------------------------------------
            // NOTIFY PARENT
            // --------------------------------------------------

            if (
                typeof onSuccess === "function"
            ) {
                onSuccess();
            }

            // --------------------------------------------------
            // CLOSE MODAL
            // --------------------------------------------------

            if (
                typeof onClose === "function"
            ) {
                onClose();
            }

        } catch (error) {
            console.error(
                "Failed to delete subject:",
                error
            );

            // --------------------------------------------------
            // GET BACKEND ERROR MESSAGE
            // --------------------------------------------------

            const backendMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "";

            const message =
                String(backendMessage).trim();

            // --------------------------------------------------
            // SHOW BACKEND ERROR
            // --------------------------------------------------

            toast.error(
                message ||
                    "Failed to delete subject. Please try again.",
                {
                    duration: 4000,
                }
            );

            // --------------------------------------------------
            // IMPORTANT:
            // Modal stays open because we do NOT call onClose()
            // when deletion fails.
            // --------------------------------------------------

        } finally {
            setLoading(false);
        }
    };

    // ==========================================================
    // CLOSE MODAL
    // ==========================================================

    const handleClose = () => {

        // Don't allow closing during deletion
        if (loading) {
            return;
        }

        if (
            typeof onClose === "function"
        ) {
            onClose();
        }
    };

    // ==========================================================
    // HIDE MODAL
    // ==========================================================

    if (!open || !subject) {
        return null;
    }

    // ==========================================================
    // RENDER
    // ==========================================================

    return createPortal(

        <div
            className="subject-modal-overlay"
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
                className="subject-delete-modal"
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >

                {/* ==================================================
                    ICON
                ================================================== */}

                <div className="subject-delete-icon">

                    <AlertTriangle size={32} />

                </div>

                {/* ==================================================
                    CONTENT
                ================================================== */}

                <h2>
                    Delete Subject?
                </h2>

                <p>
                    Are you sure you want to delete
                    this subject?
                </p>

                {/* ==================================================
                    SUBJECT DETAILS
                ================================================== */}

                <div className="subject-delete-details">

                    <strong>
                        {subject.code}
                    </strong>

                    <span>
                        {subject.name}
                    </span>

                </div>

                {/* ==================================================
                    WARNING
                ================================================== */}

                <p className="subject-delete-warning">
                    This action cannot be undone.
                </p>

                {/* ==================================================
                    ACTIONS
                ================================================== */}

                <div className="subject-delete-actions">

                    {/* CANCEL */}

                    <button
                        type="button"
                        className="subject-cancel-btn"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    {/* DELETE */}

                    <button
                        type="button"
                        className="subject-delete-confirm-btn"
                        onClick={handleDelete}
                        disabled={loading}
                    >

                        <Trash2 size={18} />

                        {loading
                            ? "Deleting..."
                            : "Delete Subject"}

                    </button>

                </div>

            </div>

        </div>,

        document.body
    );
}