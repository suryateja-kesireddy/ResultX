import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    TriangleAlert,
    Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
    deleteAcademicYear,
} from "../../../../services/academicYear/academicYearService";

export default function DeleteAcademicYearModal({
    open,
    onClose,
    onSuccess,
    academicYear,
}) {

    const [loading, setLoading] = useState(false);


    /* ==================================================
       DELETE
    ================================================== */

    const handleDelete = async () => {

        if (loading) {
            return;
        }

        if (!academicYear) {

            toast.error(
                "Academic year not found."
            );

            return;
        }


        try {

            setLoading(true);


            /* ------------------------------------------
               DELETE
            ------------------------------------------ */

            await deleteAcademicYear(
                academicYear.id
            );


            /* ------------------------------------------
               SUCCESS TOAST
            ------------------------------------------ */

            toast.success(
                "Academic year deleted successfully!"
            );


            /* ------------------------------------------
               REFRESH DATA
            ------------------------------------------ */

            if (onSuccess) {
                await onSuccess();
            }


            /* ------------------------------------------
               CLOSE MODAL
            ------------------------------------------ */

            onClose();

        } catch (error) {

            console.error(
                "Failed to delete academic year:",
                error
            );


            /* ------------------------------------------
               BACKEND ERROR
            ------------------------------------------ */

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Failed to delete academic year.";

            toast.error(message);

        } finally {

            setLoading(false);

        }

    };


    /* ==================================================
       ESC KEY
    ================================================== */

    useEffect(() => {

        const handleEscape = (e) => {

            if (
                e.key === "Escape" &&
                open &&
                !loading
            ) {
                onClose();
            }

        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

        };

    }, [open, loading, onClose]);


    /* ==================================================
       DON'T RENDER
    ================================================== */

    if (!open || !academicYear) {
        return null;
    }


    /* ==================================================
       MODAL
    ================================================== */

    return createPortal(

        <div
            className="academic-delete-overlay"
            onMouseDown={(e) => {

                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    onClose();
                }

            }}
        >

            <div
                className="academic-delete-modal"
                onMouseDown={(e) =>
                    e.stopPropagation()
                }
            >


                {/* ==================================================
                    WARNING ICON
                ================================================== */}

                <div className="academic-delete-icon">

                    <TriangleAlert size={34} />

                </div>


                {/* ==================================================
                    CONTENT
                ================================================== */}

                <h2>
                    Delete Academic Year?
                </h2>


                <p>
                    You are about to permanently
                    delete this academic year.
                </p>


                <h3>
                    {academicYear.year}
                </h3>


                <span>
                    This action cannot be undone.
                </span>


                {/* ==================================================
                    ACTIONS
                ================================================== */}

                <div className="academic-delete-actions">

                    <button
                        type="button"
                        className="academic-btn-cancel"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        className="academic-btn-delete"
                        onClick={handleDelete}
                        disabled={loading}
                    >

                        <Trash2 size={17} />

                        {loading
                            ? "Deleting..."
                            : "Delete Academic Year"}

                    </button>

                </div>

            </div>

        </div>,

        document.body

    );

}