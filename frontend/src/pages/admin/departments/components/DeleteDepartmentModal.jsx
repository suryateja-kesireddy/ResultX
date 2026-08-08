import { useState } from "react";
import { createPortal } from "react-dom";
import {
    AlertTriangle,
    Trash2,
    X,
} from "lucide-react";

import {
    deleteDepartment,
} from "../../../../services/department/departmentService";


export default function DeleteDepartmentModal({
    open,
    onClose,
    onSuccess,
    department,
}) {

    const [loading, setLoading] = useState(false);


    /* =====================================================
       CLOSED
    ===================================================== */

    if (!open || !department) {
        return null;
    }


    /* =====================================================
       DELETE
    ===================================================== */

    const handleDelete = async () => {

        try {

            setLoading(true);


            await deleteDepartment(
                department.id
            );


            if (onSuccess) {
                await onSuccess();
            }


            onClose();


        } catch (error) {

            console.error(
                "Failed to delete department:",
                error
            );


            alert(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete department"
            );

        } finally {

            setLoading(false);

        }

    };


    return createPortal(

        <div
            className="department-delete-overlay"
            onMouseDown={(e) => {

                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {

                    onClose();

                }

            }}
        >

            <div className="department-delete-modal">


                {/* =========================================
                   HEADER
                ========================================= */}

                <div className="department-delete-header">

                    <div className="department-delete-icon">

                        <AlertTriangle size={30} />

                    </div>


                    <button
                        type="button"
                        className="department-delete-close"
                        onClick={onClose}
                        disabled={loading}
                    >

                        <X size={19} />

                    </button>

                </div>


                {/* =========================================
                   CONTENT
                ========================================= */}

                <div className="department-delete-content">

                    <h2>
                        Delete Department?
                    </h2>


                    <p>
                        Are you sure you want to
                        permanently delete this
                        department?
                    </p>


                    <div className="department-delete-info">

                        <strong>
                            {department.name}
                        </strong>


                        <span>
                            {department.code || "-"}
                        </span>

                    </div>


                    <p className="department-delete-warning">

                        This action cannot be undone.
                        All department-related
                        information may be affected.

                    </p>

                </div>


                {/* =========================================
                   ACTIONS
                ========================================= */}

                <div className="department-delete-actions">

                    <button
                        type="button"
                        className="department-delete-cancel"
                        onClick={onClose}
                        disabled={loading}
                    >

                        Cancel

                    </button>


                    <button
                        type="button"
                        className="department-delete-confirm"
                        onClick={handleDelete}
                        disabled={loading}
                    >

                        <Trash2 size={17} />

                        {loading
                            ? "Deleting..."
                            : "Delete Department"}

                    </button>

                </div>

            </div>

        </div>,

        document.body

    );

}