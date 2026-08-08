import { useState } from "react";
import { createPortal } from "react-dom";
import {
    AlertTriangle,
    Trash2,
    X,
    Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
    deleteHOD,
} from "../../../../services/hod/hodService";

export default function DeleteHODModal({
    open,
    onClose,
    onSuccess,
    hod,
}) {
    const [loading, setLoading] =
        useState(false);


    // ==========================================================
    // CLOSE
    // ==========================================================

    if (!open || !hod) {
        return null;
    }


    // ==========================================================
    // DELETE HOD
    // ==========================================================

    const handleDelete = async () => {

        if (loading) {
            return;
        }

        try {

            setLoading(true);


            // ==================================================
            // DELETE API
            // ==================================================

            await deleteHOD(hod.id);


            // ==================================================
            // SUCCESS TOAST
            // ==================================================

            toast.success(
                "HOD deleted successfully!",
                {
                    duration: 3000,
                }
            );


            // ==================================================
            // REFRESH HOD LIST
            // ==================================================

            if (onSuccess) {
                onSuccess();
            }


            // ==================================================
            // CLOSE MODAL
            // ==================================================

            onClose();

        } catch (error) {

            console.error(
                "Failed to delete HOD:",
                error
            );


            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete HOD";


            toast.error(
                message,
                {
                    duration: 4000,
                }
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================================
    // MODAL
    // ==========================================================

    return createPortal(

        <div
            className="hod-delete-overlay"
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
                className="hod-delete-modal"
                onMouseDown={(e) =>
                    e.stopPropagation()
                }
            >

                {/* ==================================================
                    CLOSE BUTTON
                ================================================== */}

                <button
                    type="button"
                    className="hod-delete-close"
                    onClick={onClose}
                    disabled={loading}
                    aria-label="Close"
                >
                    <X size={19} />
                </button>


                {/* ==================================================
                    WARNING ICON
                ================================================== */}

                <div className="hod-delete-icon">

                    <AlertTriangle size={30} />

                </div>


                {/* ==================================================
                    CONTENT
                ================================================== */}

                <div className="hod-delete-content">

                    <h2>
                        Delete HOD?
                    </h2>


                    <p className="hod-delete-description">

                        Are you sure you want to delete
                        this HOD account?

                    </p>


                    {/* ==================================================
                        HOD INFORMATION
                    ================================================== */}

                    <div className="hod-delete-user">

                        <strong>
                            {hod.user?.name || "-"}
                        </strong>

                        <span>
                            {hod.employeeId || "-"}
                        </span>

                        {hod.user?.email && (
                            <small>
                                {hod.user.email}
                            </small>
                        )}

                    </div>


                    {/* ==================================================
                        WARNING
                    ================================================== */}

                    <div className="hod-delete-warning">

                        <AlertTriangle size={17} />

                        <span>
                            This action cannot be undone.
                            The HOD account and its associated
                            user account will be permanently deleted.
                        </span>

                    </div>

                </div>


                {/* ==================================================
                    ACTIONS
                ================================================== */}

                <div className="hod-delete-actions">

                    <button
                        type="button"
                        className="hod-delete-cancel"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        className="hod-delete-confirm"
                        onClick={handleDelete}
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <Loader2
                                    size={17}
                                    className="hod-delete-loading"
                                />

                                Deleting...
                            </>

                        ) : (

                            <>
                                <Trash2 size={17} />

                                Delete HOD
                            </>

                        )}

                    </button>

                </div>

            </div>

        </div>,

        document.body
    );
}