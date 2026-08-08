import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen } from "lucide-react";

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

    useEffect(() => {
        if (open) {
            loadData();
        }
    }, [open]);

    const loadData = async () => {
        try {
            const [departmentData, semesterData] =
                await Promise.all([
                    getAllDepartments(),
                    getSemesters(),
                ]);

            setDepartments(departmentData);
            setSemesters(semesterData);
        } catch (error) {
            console.error("Failed to load subject data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await createSubject({
                code: formData.code.trim().toUpperCase(),
                name: formData.name.trim(),
                credits: Number(formData.credits),
                departmentId: Number(formData.departmentId),
                semesterId: Number(formData.semesterId),
            });

            setFormData({
                code: "",
                name: "",
                credits: "",
                departmentId: "",
                semesterId: "",
            });

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to create subject:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!open) {
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
                        <h2>Create Subject</h2>

                        <p>
                            Add a new subject to
                            SRK Institute of Technology.
                        </p>
                    </div>

                </div>

                {/* ================= FORM ================= */}

                <form
                    className="subject-form"
                    onSubmit={handleSubmit}
                >

                    <div className="subject-form-grid">

                        {/* Subject Code */}

                        <div className="subject-form-group">

                            <label>
                                Subject Code
                            </label>

                            <input
                                type="text"
                                name="code"
                                placeholder="Example: MCA201"
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* Subject Name */}

                        <div className="subject-form-group">

                            <label>
                                Subject Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Subject Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* Credits */}

                        <div className="subject-form-group">

                            <label>
                                Credits
                            </label>

                            <input
                                type="number"
                                name="credits"
                                placeholder="Example: 4"
                                value={formData.credits}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                required
                            />

                        </div>

                        {/* Department */}

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

                                {departments.map((department) => (
                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        {/* Semester */}

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

                                {semesters.map((semester) => (
                                    <option
                                        key={semester.id}
                                        value={semester.id}
                                    >
                                        Semester {semester.number}
                                        {" "}
                                        ({semester.academicYear?.year})
                                    </option>
                                ))}

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
                                ? "Creating..."
                                : "Create Subject"}
                        </button>

                    </div>

                </form>

            </div>

        </div>,

        document.body
    );
}