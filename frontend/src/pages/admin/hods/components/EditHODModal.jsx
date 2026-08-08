import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { UserPen } from "lucide-react";

import { updateHOD } from "../../../../services/hod/hodService";

import {
    getAllDepartments,
} from "../../../../services/department/departmentService";

export default function EditHODModal({
    open,
    onClose,
    onSuccess,
    hod,
}) {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        employeeId: "",
        phone: "",
        departmentId: "",
        isActive: true,
    });

    // ==========================================
    // Load Departments
    // ==========================================

    useEffect(() => {
        if (open) {
            loadDepartments();
        }
    }, [open]);

    // ==========================================
    // Load HOD Data
    // ==========================================

    useEffect(() => {
        if (hod) {
            setFormData({
                name: hod.user?.name || "",
                email: hod.user?.email || "",
                employeeId: hod.employeeId || "",
                phone: hod.phone || "",
                departmentId:
                    hod.departmentId ??
                    hod.department?.id ??
                    "",
                isActive:
                    hod.user?.isActive ?? true,
            });
        }
    }, [hod]);

    const loadDepartments = async () => {
        try {
            const data = await getAllDepartments();

            setDepartments(data || []);
        } catch (error) {
            console.error(
                "Failed to load departments:",
                error
            );
        }
    };

    // ==========================================
    // Handle Change
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // Phone
    // ==========================================

    const handlePhoneChange = (e) => {
        const value = e.target.value
            .replace(/\D/g, "")
            .slice(0, 10);

        setFormData((prev) => ({
            ...prev,
            phone: value,
        }));
    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hod) return;

        if (
            formData.phone &&
            formData.phone.length !== 10
        ) {
            alert(
                "Phone number must contain exactly 10 digits."
            );

            return;
        }

        try {
            setLoading(true);

            await updateHOD(
                hod.id,
                {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone || null,
                    departmentId:
                        Number(formData.departmentId),
                    isActive: formData.isActive,
                }
            );

            onSuccess();

            onClose();

        } catch (error) {
            console.error(
                "Failed to update HOD:",
                error
            );

            alert(
                error?.response?.data?.message ||
                "Failed to update HOD"
            );

        } finally {
            setLoading(false);
        }
    };

    if (!open || !hod) {
        return null;
    }

    return createPortal(
        <div
            className="hod-modal-overlay"
            onMouseDown={(e) => {
                if (
                    e.target === e.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >

            <div className="hod-modal">

                {/* ==================================
                    HEADER
                ================================== */}

                <div className="hod-modal-header">

                    <div className="hod-modal-icon">
                        <UserPen size={27} />
                    </div>

                    <div>

                        <h2>
                            Edit HOD
                        </h2>

                        <p>
                            Update HOD details and
                            department assignment.
                        </p>

                    </div>

                </div>


                {/* ==================================
                    FORM
                ================================== */}

                <form
                    className="hod-form"
                    onSubmit={handleSubmit}
                >

                    <div className="hod-form-grid">

                        {/* Name */}

                        <div className="hod-form-group">

                            <label>
                                HOD Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter HOD name"
                                required
                            />

                        </div>


                        {/* Email */}

                        <div className="hod-form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />

                        </div>


                        {/* Employee ID */}

                        <div className="hod-form-group">

                            <label>
                                Employee ID
                            </label>

                            <input
                                type="text"
                                name="employeeId"
                                value={formData.employeeId}
                                disabled
                            />

                        </div>


                        {/* Phone */}

                        <div className="hod-form-group">

                            <label>
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                placeholder="10 digit phone number"
                                maxLength={10}
                                inputMode="numeric"
                            />

                        </div>


                        {/* Department */}

                        <div className="hod-form-group">

                            <label>
                                Department
                            </label>

                            <select
                                name="departmentId"
                                value={
                                    formData.departmentId
                                }
                                onChange={handleChange}
                                required
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


                        {/* Status */}

                        <div className="hod-form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="isActive"
                                value={
                                    String(
                                        formData.isActive
                                    )
                                }
                                onChange={(e) =>
                                    setFormData(
                                        (prev) => ({
                                            ...prev,
                                            isActive:
                                                e.target.value ===
                                                "true",
                                        })
                                    )
                                }
                            >

                                <option value="true">
                                    Active
                                </option>

                                <option value="false">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* ==================================
                        ACTIONS
                    ================================== */}

                    <div className="hod-modal-actions">

                        <button
                            type="button"
                            className="hod-cancel-btn"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="hod-save-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Updating..."
                                : "Update HOD"}
                        </button>

                    </div>

                </form>

            </div>

        </div>,

        document.body
    );
}