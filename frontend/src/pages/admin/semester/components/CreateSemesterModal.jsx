import { useEffect, useState } from "react";
import { CalendarPlus, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

import {
    createSemester,
} from "../../../../services/semester/semesterService";

import {
    getAcademicYears,
} from "../../../../services/academicYear/academicYearService";


export default function CreateSemesterModal({
    open,
    onClose,
    onSuccess,
}) {

    /* ==========================================================
       STATE
    ========================================================== */

    const [academicYears, setAcademicYears] =
        useState([]);

    const [loadingAcademicYears, setLoadingAcademicYears] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] = useState({
        number: "",
        type: "",
        academicYearId: "",
    });


    /* ==========================================================
       LOAD ACADEMIC YEARS
    ========================================================== */

    useEffect(() => {

        if (!open) {
            return;
        }

        loadAcademicYears();

    }, [open]);


    const loadAcademicYears = async () => {

        if (loadingAcademicYears) {
            return;
        }

        try {

            setLoadingAcademicYears(true);

            const data =
                await getAcademicYears();

            setAcademicYears(data || []);

        } catch (error) {

            console.error(
                "Failed to load academic years:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Failed to load academic years.";

            toast.error(message, {
                duration: 4000,
            });

        } finally {

            setLoadingAcademicYears(false);

        }

    };


    /* ==========================================================
       HANDLE CHANGE
    ========================================================== */

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


    /* ==========================================================
       RESET FORM
    ========================================================== */

    const resetForm = () => {

        setFormData({
            number: "",
            type: "",
            academicYearId: "",
        });

    };


    /* ==========================================================
       CLOSE
    ========================================================== */

    const handleClose = () => {

        if (loading) {
            return;
        }

        resetForm();

        onClose();

    };


    /* ==========================================================
       SUBMIT
    ========================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();


        /* ======================================================
           PREVENT MULTIPLE ATTEMPTS
        ====================================================== */

        if (loading) {
            return;
        }


        /* ======================================================
           VALIDATION
        ====================================================== */

        if (!formData.number) {

            toast.error(
                "Please select a semester.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        if (!formData.type) {

            toast.error(
                "Please select semester type.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        if (!formData.academicYearId) {

            toast.error(
                "Please select an academic year.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        /* ======================================================
           CREATE SEMESTER
        ====================================================== */

        try {

            /*
             * Lock form immediately.
             */

            setLoading(true);


            await createSemester({

                number:
                    Number(formData.number),

                type:
                    formData.type,

                academicYearId:
                    Number(
                        formData.academicYearId
                    ),

            });


            /* ==================================================
               SUCCESS
            ================================================== */

            toast.success(
                "Semester created successfully!",
                {
                    duration: 3000,
                }
            );


            /* ==================================================
               RESET
            ================================================== */

            resetForm();


            /* ==================================================
               REFRESH LIST
            ================================================== */

            if (onSuccess) {
                await onSuccess();
            }


            /* ==================================================
               CLOSE MODAL
            ================================================== */

            onClose();


        } catch (error) {

            console.error(
                "Failed to create semester:",
                error
            );


            /* ==================================================
               BACKEND ERROR
            ================================================== */

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.response?.data?.details?.message ||
                error?.message ||
                "Failed to create semester.";


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


    /* ==========================================================
       DON'T RENDER
    ========================================================== */

    if (!open) {
        return null;
    }


    /* ==========================================================
       MODAL
    ========================================================== */

    return createPortal(

        <div
            className="semester-modal-overlay"

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
                className="semester-modal"

                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >


                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="semester-modal-header">

                    <div className="semester-modal-icon">

                        <CalendarPlus size={30} />

                    </div>


                    <div>

                        <h2>
                            Create Semester
                        </h2>

                        <p>
                            Add a new semester for
                            SRK Institute of Technology.
                        </p>

                    </div>

                </div>


                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                    className="semester-form"
                    onSubmit={handleSubmit}
                >


                    {/* ==================================================
                        SEMESTER NUMBER
                    ================================================== */}

                    <div className="semester-form-group">

                        <label>
                            Semester Number
                        </label>

                        <select
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        >

                            <option value="">
                                Select Semester
                            </option>


                            {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                (semester) => (

                                    <option
                                        key={semester}
                                        value={semester}
                                    >
                                        Semester {semester}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* ==================================================
                        SEMESTER TYPE
                    ================================================== */}

                    <div className="semester-form-group">

                        <label>
                            Semester Type
                        </label>

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        >

                            <option value="">
                                Select Type
                            </option>

                            <option value="ODD">
                                ODD
                            </option>

                            <option value="EVEN">
                                EVEN
                            </option>

                        </select>

                    </div>


                    {/* ==================================================
                        ACADEMIC YEAR
                    ================================================== */}

                    <div className="semester-form-group">

                        <label>
                            Academic Year
                        </label>

                        <select
                            name="academicYearId"
                            value={formData.academicYearId}
                            onChange={handleChange}
                            required
                            disabled={
                                loading ||
                                loadingAcademicYears
                            }
                        >

                            <option value="">

                                {loadingAcademicYears
                                    ? "Loading academic years..."
                                    : "Select Academic Year"}

                            </option>


                            {academicYears.map(
                                (year) => (

                                    <option
                                        key={year.id}
                                        value={year.id}
                                    >
                                        {year.year}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* ==================================================
                        FOOTER
                    ================================================== */}

                    <div className="semester-modal-footer">


                        {/* CANCEL */}

                        <button
                            type="button"
                            className="semester-btn-cancel"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>


                        {/* CREATE */}

                        <button
                            type="submit"
                            className="semester-btn-save"
                            disabled={
                                loading ||
                                loadingAcademicYears
                            }
                        >

                            {loading ? (

                                <>
                                    <Loader2
                                        size={18}
                                        className="semester-spinner"
                                    />

                                    Creating...

                                </>

                            ) : (

                                <>
                                    <CalendarPlus
                                        size={18}
                                    />

                                    Create Semester
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