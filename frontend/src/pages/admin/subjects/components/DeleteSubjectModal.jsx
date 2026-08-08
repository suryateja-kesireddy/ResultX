import { useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Trash2 } from "lucide-react";

import {
    deleteSubject,
} from "../../../../services/subject/subjectService";

export default function DeleteSubjectModal({
    open,
    onClose,
    onSuccess,
    subject,
}) {

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {

        if (!subject) {
            return;
        }

        try {

            setLoading(true);

            await deleteSubject(subject.id);

            onSuccess();

            onClose();

        } catch (error) {

            console.error(
                "Failed to delete subject:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    if (!open || !subject) {
        return null;
    }

    return createPortal(

        <div className="subject-modal-overlay">

            <div className="subject-delete-modal">

                {/* ================= ICON ================= */}

                <div className="subject-delete-icon">

                    <AlertTriangle size={32} />

                </div>

                {/* ================= CONTENT ================= */}

                <h2>
                    Delete Subject?
                </h2>

                <p>
                    Are you sure you want to delete
                    this subject?
                </p>

                <div className="subject-delete-details">

                    <strong>
                        {subject.code}
                    </strong>

                    <span>
                        {subject.name}
                    </span>

                </div>

                <p className="subject-delete-warning">
                    This action cannot be undone.
                </p>

                {/* ================= ACTIONS ================= */}

                <div className="subject-delete-actions">

                    <button
                        type="button"
                        className="subject-cancel-btn"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

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