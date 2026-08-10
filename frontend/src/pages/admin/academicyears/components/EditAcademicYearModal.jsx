import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    CalendarClock,
    CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

import {
    updateAcademicYear,
} from "../../../../services/academicYear/academicYearService";

export default function EditAcademicYearModal({
    open,
    onClose,
    onSuccess,
    academicYear,
}) {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        year: "",
        isCurrent: false,
    });


    /* ==================================================
       LOAD ACADEMIC YEAR DATA
    ================================================== */

    useEffect(() => {

        if (academicYear) {

            setFormData({
                year: academicYear.year || "",
                isCurrent: academicYear.isCurrent || false,
            });

        }

    }, [academicYear]);


    /* ==================================================
       HANDLE INPUT
    ================================================== */

    const handleChange = (e) => {

        const {
            name,
            value,
            checked,
            type,
        } = e.target;

        setFormData((prev) => ({
            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

    };


    /* ==================================================
       SUBMIT
    ================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) {
            return;
        }

        if (!academicYear) {
            toast.error("Academic year not found.");
            return;
        }


        /* ----------------------------------------------
           VALIDATION
        ---------------------------------------------- */

        const year = formData.year.trim();

        if (!year) {

            toast.error(
                "Academic year is required."
            );

            return;
        }


        try {

            setLoading(true);


            /* ------------------------------------------
               UPDATE
            ------------------------------------------ */

            await updateAcademicYear(
                academicYear.id,
                {
                    year,
                    isCurrent: formData.isCurrent,
                }
            );


            /* ------------------------------------------
               SUCCESS
            ------------------------------------------ */

            toast.success(
                "Academic year updated successfully!"
            );


            if (onSuccess) {
                await onSuccess();
            }


            onClose();

        } catch (error) {

            console.error(
                "Failed to update academic year:",
                error
            );


            /* ------------------------------------------
               BACKEND ERROR MESSAGE
            ------------------------------------------ */

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Failed to update academic year.";

            toast.error(message);

        } finally {

            setLoading(false);

        }

    };


    /* ==================================================
       CLOSE ON ESC
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
            className="academic-modal-overlay"
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
                className="academic-modal"
                onMouseDown={(e) =>
                    e.stopPropagation()
                }
            >


                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="academic-modal-header">

                    <div className="academic-modal-icon">

                        <CalendarClock size={30} />

                    </div>


                    <div>

                        <h2>
                            Edit Academic Year
                        </h2>

                        <p>
                            Update academic year details
                            for SRK Institute of Technology.
                        </p>

                    </div>

                </div>


                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                    className="academic-form"
                    onSubmit={handleSubmit}
                >


                    {/* Academic Year */}

                    <div className="academic-form-group">

                        <label>
                            Academic Year
                        </label>

                        <input
                            type="text"
                            name="year"
                            placeholder="Example : 2026-2027"
                            value={formData.year}
                            onChange={handleChange}
                            disabled={loading}
                            autoFocus
                            required
                        />

                    </div>


                    {/* ==================================================
                        CURRENT ACADEMIC YEAR
                    ================================================== */}

                    <div className="academic-checkbox-card">

                        <label className="academic-checkbox">

                            <input
                                type="checkbox"
                                name="isCurrent"
                                checked={formData.isCurrent}
                                onChange={handleChange}
                                disabled={loading}
                            />


                            <div>

                                <h4>

                                    <CheckCircle2
                                        size={18}
                                    />

                                    Set as Current Academic Year

                                </h4>


                                <p>
                                    Mark this as the active
                                    academic session for
                                    the institution.
                                </p>

                            </div>

                        </label>

                    </div>


                    {/* ==================================================
                        FOOTER
                    ================================================== */}

                    <div className="academic-modal-footer">

                        <button
                            type="button"
                            className="academic-btn-cancel"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="academic-btn-save"
                            disabled={loading}
                        >

                            {loading
                                ? "Updating..."
                                : "Update Academic Year"}

                        </button>

                    </div>

                </form>

            </div>

        </div>,

        document.body

    );

}