import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen } from "lucide-react";

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

    // ==========================================
    // Load Departments & Semesters
    // ==========================================

    useEffect(() => {

        if (open) {
            loadData();
        }

    }, [open]);

    // ==========================================
    // Load Existing Subject
    // ==========================================

    useEffect(() => {

        if (subject) {

            setFormData({
                code: subject.code || "",
                name: subject.name || "",
                credits: subject.credits || "",
                departmentId:
                    subject.departmentId ??
                    subject.department?.id ??
                    "",
                semesterId:
                    subject.semesterId ??
                    subject.semester?.id ??
                    "",
            });

        }

    }, [subject]);

    // ==========================================
    // Load Data
    // ==========================================

    const loadData = async () => {

        try {

            const [
                departmentData,
                semesterData,
            ] = await Promise.all([

                getAllDepartments(),

                getSemesters(),

            ]);

            setDepartments(departmentData);

            setSemesters(semesterData);

        } catch (error) {

            console.error(
                "Failed to load subject data:",
                error
            );

        }

    };

    // ==========================================
    // Handle Input
    // ==========================================

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

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!subject) {
            return;
        }

        try {

            setLoading(true);

            await updateSubject(

                subject.id,

                {
                    code:
                        formData.code
                            .trim()
                            .toUpperCase(),

                    name:
                        formData.name.trim(),

                    credits:
                        Number(formData.credits),

                    departmentId:
                        Number(formData.departmentId),

                    semesterId:
                        Number(formData.semesterId),
                }

            );

            onSuccess();

            onClose();

        } catch (error) {

            console.error(
                "Failed to update subject:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Close
    // ==========================================

    if (!open || !subject) {
        return null;
    }

    return createPortal(

        <div className="subject-modal-overlay">

            <div className="subject-modal">

                {/* ================= HEADER ================= */}

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

                {/* ================= FORM ================= */}

                <form
                    className="subject-form"
                    onSubmit={handleSubmit}
                >

                    <div className="subject-form-grid">

                        {/* CODE */}

                        <div className="subject-form-group">

                            <label>
                                Subject Code
                            </label>

                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* NAME */}

                        <div className="subject-form-group">

                            <label>
                                Subject Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* CREDITS */}

                        <div className="subject-form-group">

                            <label>
                                Credits
                            </label>

                            <input
                                type="number"
                                name="credits"
                                value={formData.credits}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                required
                            />

                        </div>

                        {/* DEPARTMENT */}

                        <div className="subject-form-group">

                            <label>
                                Department
                            </label>

                            <select
                                name="departmentId"
                                value={formData.departmentId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Department
                                </option>

                                {departments.map(
                                    (department) => (

                                        <option
                                            key={department.id}
                                            value={department.id}
                                        >
                                            {department.name}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                        {/* SEMESTER */}

                        <div className="subject-form-group">

                            <label>
                                Semester
                            </label>

                            <select
                                name="semesterId"
                                value={formData.semesterId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Semester
                                </option>

                                {semesters.map(
                                    (semester) => (

                                        <option
                                            key={semester.id}
                                            value={semester.id}
                                        >
                                            Semester{" "}
                                            {semester.number}
                                            {" "}
                                            (
                                            {semester.academicYear?.year}
                                            )
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    </div>

                    {/* ================= FOOTER ================= */}

                    <div className="subject-modal-actions">

                        <button
                            type="button"
                            className="subject-cancel-btn"
                            onClick={onClose}
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