import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";

import { createSubject } from "../../../../services/subject/subjectService";

import {
    getAllDepartments,
} from "../../../../services/department/departmentService";

import {
    getSemesters,
} from "../../../../services/semester/semesterService";

export default function CreateSubjectModal({
    open,
    onClose,
    onSuccess,
}) {
    // ==========================================================
    // STATE
    // ==========================================================

    const [departments, setDepartments] = useState([]);
    const [semesters, setSemesters] = useState([]);

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        credits: "",
        departmentId: "",
        semesterId: "",
    });

    const [loading, setLoading] = useState(false);

    // ==========================================================
    // LOAD DEPARTMENTS + SEMESTERS
    // ==========================================================

    useEffect(() => {
        if (!open) {
            return;
        }

        loadData();
    }, [open]);

    const loadData = async () => {
        try {
            const [
                departmentData,
                semesterData,
            ] = await Promise.all([
                getAllDepartments(),
                getSemesters(),
            ]);

            setDepartments(
                Array.isArray(departmentData)
                    ? departmentData
                    : []
            );

            setSemesters(
                Array.isArray(semesterData)
                    ? semesterData
                    : []
            );

        } catch (error) {
            console.error(
                "Failed to load subject data:",
                error
            );

            toast.error(
                "Failed to load departments and semesters."
            );
        }
    };

    // ==========================================================
    // HANDLE INPUT CHANGE
    // ==========================================================

    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // ==========================================================
    // RESET FORM
    // ==========================================================

    const resetForm = () => {
        setFormData({
            code: "",
            name: "",
            credits: "",
            departmentId: "",
            semesterId: "",
        });
    };

    // ==========================================================
    // HANDLE CREATE SUBJECT
    // ==========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ------------------------------------------------------
        // PREVENT MULTIPLE SUBMISSIONS
        // ------------------------------------------------------

        if (loading) {
            return;
        }

        // ------------------------------------------------------
        // BASIC VALIDATION
        // ------------------------------------------------------

        const code = formData.code
            .trim()
            .toUpperCase();

        const name = formData.name.trim();

        const credits = Number(
            formData.credits
        );

        const departmentId = Number(
            formData.departmentId
        );

        const semesterId = Number(
            formData.semesterId
        );

        if (!code) {
            toast.error(
                "Please enter the subject code."
            );
            return;
        }

        if (!name) {
            toast.error(
                "Please enter the subject name."
            );
            return;
        }

        if (
            !credits ||
            credits < 1 ||
            credits > 10
        ) {
            toast.error(
                "Credits must be between 1 and 10."
            );
            return;
        }

        if (!departmentId) {
            toast.error(
                "Please select a department."
            );
            return;
        }

        if (!semesterId) {
            toast.error(
                "Please select a semester."
            );
            return;
        }

        // ------------------------------------------------------
        // START REQUEST
        // ------------------------------------------------------

        try {
            setLoading(true);

            await createSubject({
                code,
                name,
                credits,
                departmentId,
                semesterId,
            });

            // --------------------------------------------------
            // SUCCESS
            // --------------------------------------------------

            toast.success(
                "Subject added successfully!",
                {
                    duration: 3000,
                }
            );

            resetForm();

            // Notify parent
            if (typeof onSuccess === "function") {
                onSuccess();
            }

            // Close only after successful creation
            if (typeof onClose === "function") {
                onClose();
            }

        } catch (error) {
            console.error(
                "Failed to create subject:",
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

            const lowerMessage =
                message.toLowerCase();

            // --------------------------------------------------
            // DUPLICATE SUBJECT
            // --------------------------------------------------

            const isDuplicate =
                lowerMessage.includes(
                    "already exists"
                ) ||
                lowerMessage.includes(
                    "already exist"
                ) ||
                lowerMessage.includes(
                    "duplicate"
                ) ||
                lowerMessage.includes(
                    "unique constraint"
                ) ||
                lowerMessage.includes(
                    "unique constraint failed"
                ) ||
                lowerMessage.includes(
                    "p2002"
                );

            if (isDuplicate) {
                toast.error(
                    "Subject already exists.",
                    {
                        duration: 3500,
                    }
                );

                return;
            }

            // --------------------------------------------------
            // OTHER ERROR
            // --------------------------------------------------

            toast.error(
                message ||
                    "Failed to add subject. Please try again.",
                {
                    duration: 3500,
                }
            );

        } finally {
            setLoading(false);
        }
    };

    // ==========================================================
    // CLOSE MODAL
    // ==========================================================

    const handleClose = () => {
        // Don't allow closing while API request is running
        if (loading) {
            return;
        }

        resetForm();

        if (typeof onClose === "function") {
            onClose();
        }
    };

    // ==========================================================
    // MODAL CLOSED
    // ==========================================================

    if (!open) {
        return null;
    }

    // ==========================================================
    // RENDER
    // ==========================================================

    return createPortal(
        <div
            className="subject-modal-overlay"
            onMouseDown={(e) => {
                // Close only when clicking the overlay itself
                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    handleClose();
                }
            }}
        >

            <div
                className="subject-modal"
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="subject-modal-header">

                    <div className="subject-modal-icon">
                        <BookOpen size={28} />
                    </div>

                    <div>

                        <h2>
                            Create Subject
                        </h2>

                        <p>
                            Add a new subject to
                            SRK Institute of Technology.
                        </p>

                    </div>

                </div>

                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                    className="subject-form"
                    onSubmit={handleSubmit}
                >

                    <div className="subject-form-grid">

                        {/* ==================================================
                            SUBJECT CODE
                        ================================================== */}

                        <div className="subject-form-group">

                            <label htmlFor="subject-code">
                                Subject Code
                            </label>

                            <input
                                id="subject-code"
                                type="text"
                                name="code"
                                placeholder="Example: MCA201"
                                value={formData.code}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                autoComplete="off"
                            />

                        </div>

                        {/* ==================================================
                            SUBJECT NAME
                        ================================================== */}

                        <div className="subject-form-group">

                            <label htmlFor="subject-name">
                                Subject Name
                            </label>

                            <input
                                id="subject-name"
                                type="text"
                                name="name"
                                placeholder="Enter Subject Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                autoComplete="off"
                            />

                        </div>

                        {/* ==================================================
                            CREDITS
                        ================================================== */}

                        <div className="subject-form-group">

                            <label htmlFor="subject-credits">
                                Credits
                            </label>

                            <input
                                id="subject-credits"
                                type="number"
                                name="credits"
                                placeholder="Example: 4"
                                value={formData.credits}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                required
                                disabled={loading}
                            />

                        </div>

                        {/* ==================================================
                            DEPARTMENT
                        ================================================== */}

                        <div className="subject-form-group">

                            <label htmlFor="subject-department">
                                Department
                            </label>

                            <select
                                id="subject-department"
                                name="departmentId"
                                value={
                                    formData.departmentId
                                }
                                onChange={handleChange}
                                required
                                disabled={loading}
                            >

                                <option value="">
                                    Select Department
                                </option>

                                {departments.map(
                                    (department) => (
                                        <option
                                            key={
                                                department.id
                                            }
                                            value={
                                                department.id
                                            }
                                        >
                                            {
                                                department.name
                                            }
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        {/* ==================================================
                            SEMESTER
                        ================================================== */}

                        <div className="subject-form-group">

                            <label htmlFor="subject-semester">
                                Semester
                            </label>

                            <select
                                id="subject-semester"
                                name="semesterId"
                                value={
                                    formData.semesterId
                                }
                                onChange={handleChange}
                                required
                                disabled={loading}
                            >

                                <option value="">
                                    Select Semester
                                </option>

                                {semesters.map(
                                    (semester) => (
                                        <option
                                            key={
                                                semester.id
                                            }
                                            value={
                                                semester.id
                                            }
                                        >
                                            Semester{" "}
                                            {
                                                semester.number
                                            }{" "}
                                            (
                                            {
                                                semester
                                                    .academicYear
                                                    ?.year
                                            }
                                            )
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                    </div>

                    {/* ==================================================
                        FOOTER ACTIONS
                    ================================================== */}

                    <div className="subject-modal-actions">

                        <button
                            type="button"
                            className="subject-cancel-btn"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="subject-save-btn"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    Creating...
                                </>
                            ) : (
                                "Create Subject"
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>,

        document.body
    );
}