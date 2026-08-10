import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";

import {
    updateSubject,
} from "../../../../services/subject/subjectService";

import {
    getAllDepartments,
} from "../../../../services/department/departmentService";

import {
    getSemesters,
} from "../../../../services/semester/semesterService";

export default function EditSubjectModal({
    open,
    onClose,
    onSuccess,
    subject,
}) {
    // ==========================================================
    // STATE
    // ==========================================================

    const [departments, setDepartments] = useState([]);
    const [semesters, setSemesters] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        credits: "",
        departmentId: "",
        semesterId: "",
    });

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

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Failed to load departments and semesters.";

            toast.error(String(message));
        }
    };

    // ==========================================================
    // LOAD EXISTING SUBJECT DATA
    // ==========================================================

    useEffect(() => {
        if (!subject) {
            return;
        }

        setFormData({
            code: subject.code || "",

            name: subject.name || "",

            credits:
                subject.credits ?? "",

            departmentId:
                subject.departmentId ??
                subject.department?.id ??
                "",

            semesterId:
                subject.semesterId ??
                subject.semester?.id ??
                "",
        });
    }, [subject]);

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
    // HANDLE UPDATE
    // ==========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ------------------------------------------------------
        // NO SUBJECT
        // ------------------------------------------------------

        if (!subject?.id) {
            toast.error(
                "No subject selected for update."
            );
            return;
        }

        // ------------------------------------------------------
        // PREVENT MULTIPLE REQUESTS
        // ------------------------------------------------------

        if (loading) {
            return;
        }

        // ------------------------------------------------------
        // CLEAN FORM DATA
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

        // ------------------------------------------------------
        // VALIDATION
        // ------------------------------------------------------

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
        // START UPDATE
        // ------------------------------------------------------

        try {
            setLoading(true);

            await updateSubject(
                subject.id,
                {
                    code,
                    name,
                    credits,
                    departmentId,
                    semesterId,
                }
            );

            // --------------------------------------------------
            // SUCCESS TOAST
            // --------------------------------------------------

            toast.success(
                "Subject updated successfully!",
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
                "Failed to update subject:",
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
            // DUPLICATE / UNIQUE ERROR
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
            // BACKEND ERROR MESSAGE
            // --------------------------------------------------

            toast.error(
                message ||
                    "Failed to update subject. Please try again.",
                {
                    duration: 4000,
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
        // Don't close while update is running
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
                            Edit Subject
                        </h2>

                        <p>
                            Update subject details
                            for SRK Institute of Technology.
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

                            <label htmlFor="edit-subject-code">
                                Subject Code
                            </label>

                            <input
                                id="edit-subject-code"
                                type="text"
                                name="code"
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

                            <label htmlFor="edit-subject-name">
                                Subject Name
                            </label>

                            <input
                                id="edit-subject-name"
                                type="text"
                                name="name"
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

                            <label htmlFor="edit-subject-credits">
                                Credits
                            </label>

                            <input
                                id="edit-subject-credits"
                                type="number"
                                name="credits"
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

                            <label htmlFor="edit-subject-department">
                                Department
                            </label>

                            <select
                                id="edit-subject-department"
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

                            <label htmlFor="edit-subject-semester">
                                Semester
                            </label>

                            <select
                                id="edit-subject-semester"
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
                        ACTIONS
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
                            {loading
                                ? "Updating..."
                                : "Update Subject"}
                        </button>

                    </div>

                </form>

            </div>

        </div>,

        document.body
    );
}