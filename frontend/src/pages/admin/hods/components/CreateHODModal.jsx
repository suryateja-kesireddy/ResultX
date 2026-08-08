import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, UserPlus, Eye, EyeOff } from "lucide-react";

import { createHOD } from "../../../../services/hod/hodService";
import { getAllDepartments } from "../../../../services/department/departmentService";

export default function CreateHODModal({
    open,
    onClose,
    onSuccess,
}) {
    const [departments, setDepartments] = useState([]);

    const [loadingDepartments, setLoadingDepartments] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        employeeId: "",
        phone: "",
        departmentId: "",
    });

    // ==========================================
    // Load Departments
    // ==========================================

    useEffect(() => {
        if (!open) return;

        loadDepartments();
    }, [open]);

    const loadDepartments = async () => {
        try {
            setLoadingDepartments(true);

            const data = await getAllDepartments();

            setDepartments(data || []);
        } catch (error) {
            console.error(
                "Failed to load departments:",
                error
            );
        } finally {
            setLoadingDepartments(false);
        }
    };

    // ==========================================
    // Handle Input
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // Reset Form
    // ==========================================

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            employeeId: "",
            phone: "",
            departmentId: "",
        });

        setShowPassword(false);
    };

    // ==========================================
    // Close Modal
    // ==========================================

    const handleClose = () => {
        if (loading) return;

        resetForm();

        onClose();
    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        try {
            setLoading(true);

            await createHOD(formData);

            // Tell parent that creation succeeded
            onSuccess();

            // Reset form
            resetForm();

            // Close modal
            onClose();

        } catch (error) {
            console.error(
                "Failed to create HOD:",
                error
            );

            /*
             * IMPORTANT:
             * Do not use alert().
             *
             * Your parent/toast system can handle
             * the error if you add it there.
             *
             * For now we rethrow the error so the
             * original backend message is preserved.
             */
            throw error;

        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // Don't Render When Closed
    // ==========================================

    if (!open) {
        return null;
    }

    // ==========================================
    // Modal
    // ==========================================

    return createPortal(
        <div
            className="hod-modal-overlay"
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
                className="hod-create-modal"
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >

                {/* ==================================
                    HEADER
                ================================== */}

                <div className="hod-modal-header">

                    <div className="hod-modal-title-wrapper">

                        <div className="hod-modal-icon">
                            <UserPlus size={24} />
                        </div>

                        <div>

                            <h2>
                                Create HOD
                            </h2>

                            <p>
                                Add a new Head of Department
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="hod-modal-close"
                        onClick={handleClose}
                        disabled={loading}
                        aria-label="Close"
                    >
                        <X size={21} />
                    </button>

                </div>


                {/* ==================================
                    FORM
                ================================== */}

                <form
                    className="hod-create-form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >

                    {/* Name */}

                    <div className="hod-form-group">

                        <label>
                            HOD Name
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter HOD name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* Email */}

                    <div className="hod-form-group">

                        <label>
                            Email
                            <span>*</span>
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            autoComplete="new-email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* Password */}

                    <div className="hod-form-group">

                        <label>
                            Password
                            <span>*</span>
                        </label>

                        <div className="hod-password-wrapper">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Enter password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                minLength={6}
                            />

                            <button
                                type="button"
                                className="hod-password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        (prev) => !prev
                                    )
                                }
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <EyeOff size={19} />
                                ) : (
                                    <Eye size={19} />
                                )}
                            </button>

                        </div>

                    </div>


                    {/* Employee ID */}

                    <div className="hod-form-group">

                        <label>
                            Employee ID
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="employeeId"
                            placeholder="Enter employee ID"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                            disabled={loading}
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
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={loading}
                        />

                    </div>


                    {/* Department */}

                    <div className="hod-form-group">

                        <label>
                            Department
                            <span>*</span>
                        </label>

                        <select
                            name="departmentId"
                            value={formData.departmentId}
                            onChange={handleChange}
                            required
                            disabled={
                                loading ||
                                loadingDepartments
                            }
                        >

                            <option value="">
                                {loadingDepartments
                                    ? "Loading departments..."
                                    : "Select Department"}
                            </option>

                            {departments.map(
                                (department) => (
                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                        {department.code
                                            ? ` (${department.code})`
                                            : ""}
                                    </option>
                                )
                            )}

                        </select>

                    </div>


                    {/* ==================================
                        ACTIONS
                    ================================== */}

                    <div className="hod-modal-actions">

                        <button
                            type="button"
                            className="hod-modal-cancel"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="hod-modal-submit"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="hod-spinner" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    Create HOD
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