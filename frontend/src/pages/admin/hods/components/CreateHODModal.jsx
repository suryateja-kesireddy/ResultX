import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    X,
    UserPlus,
    Eye,
    EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

import {
    createHOD,
} from "../../../../services/hod/hodService";

import {
    getAllDepartments,
} from "../../../../services/department/departmentService";


export default function CreateHODModal({
    open,
    onClose,
    onSuccess,
}) {

    /* ==================================================
       STATE
    ================================================== */

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


    /* ==================================================
       LOAD DEPARTMENTS
    ================================================== */

    useEffect(() => {

        if (!open) {
            return;
        }

        loadDepartments();

    }, [open]);


    const loadDepartments = async () => {

        /* Prevent duplicate department requests */

        if (loadingDepartments) {
            return;
        }

        try {

            setLoadingDepartments(true);

            const data =
                await getAllDepartments();

            setDepartments(data || []);

        } catch (error) {

            console.error(
                "Failed to load departments:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Failed to load departments.";

            toast.error(message);

        } finally {

            setLoadingDepartments(false);

        }
    };


    /* ==================================================
       HANDLE INPUT
    ================================================== */

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


    /* ==================================================
       RESET FORM
    ================================================== */

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


    /* ==================================================
       CLOSE MODAL
    ================================================== */

    const handleClose = () => {

        /*
         * Don't allow closing while request
         * is being processed.
         */

        if (loading) {
            return;
        }

        resetForm();

        onClose();

    };


    /* ==================================================
       SUBMIT
    ================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();


        /* ==================================================
           PREVENT MULTIPLE ATTEMPTS
        ================================================== */

        if (loading) {
            return;
        }


        /* ==================================================
           BASIC VALIDATION
        ================================================== */

        const name =
            formData.name.trim();

        const email =
            formData.email.trim();

        const password =
            formData.password;

        const employeeId =
            formData.employeeId.trim();

        const phone =
            formData.phone.trim();

        const departmentId =
            formData.departmentId;


        if (!name) {

            toast.error(
                "HOD name is required."
            );

            return;
        }


        if (!email) {

            toast.error(
                "Email address is required."
            );

            return;
        }


        if (!password) {

            toast.error(
                "Password is required."
            );

            return;
        }


        if (password.length < 6) {

            toast.error(
                "Password must be at least 6 characters."
            );

            return;
        }


        if (!employeeId) {

            toast.error(
                "Employee ID is required."
            );

            return;
        }


        if (!departmentId) {

            toast.error(
                "Please select a department."
            );

            return;
        }


        /* ==================================================
           CREATE HOD
        ================================================== */

        try {

            /*
             * Immediately lock the form.
             * This prevents double-click / multiple
             * API requests.
             */

            setLoading(true);


            await createHOD({
                name,
                email,
                password,
                employeeId,
                phone,
                departmentId,
            });


            /* ==================================================
               SUCCESS
            ================================================== */

            toast.success(
                "HOD account created successfully!"
            );


            /*
             * Tell parent to refresh HOD list.
             */

            if (onSuccess) {
                await onSuccess();
            }


            /*
             * Reset form.
             */

            resetForm();


            /*
             * Close modal.
             */

            onClose();

        } catch (error) {

            console.error(
                "Failed to create HOD:",
                error
            );


            /* ==================================================
               BACKEND ERROR MESSAGE
            ================================================== */

            const backendMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.response?.data?.details?.message ||
                error?.message;


            const message =
                backendMessage ||
                "Failed to create HOD account.";


            toast.error(message);

        } finally {

            setLoading(false);

        }

    };


    /* ==================================================
       ESC KEY
    ================================================== */

    useEffect(() => {

        const handleEscape = (e) => {

            if (
                e.key === "Escape" &&
                open &&
                !loading
            ) {

                handleClose();

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

    }, [open, loading]);


    /* ==================================================
       DON'T RENDER
    ================================================== */

    if (!open) {
        return null;
    }


    /* ==================================================
       MODAL
    ================================================== */

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


                {/* ==================================================
                    HEADER
                ================================================== */}

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


                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                    className="hod-create-form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >


                    {/* ==================================================
                        NAME
                    ================================================== */}

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


                    {/* ==================================================
                        EMAIL
                    ================================================== */}

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


                    {/* ==================================================
                        PASSWORD
                    ================================================== */}

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
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >

                                {showPassword ? (

                                    <EyeOff size={19} />

                                ) : (

                                    <Eye size={19} />

                                )}

                            </button>

                        </div>

                    </div>


                    {/* ==================================================
                        EMPLOYEE ID
                    ================================================== */}

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


                    {/* ==================================================
                        PHONE
                    ================================================== */}

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


                    {/* ==================================================
                        DEPARTMENT
                    ================================================== */}

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


                    {/* ==================================================
                        ACTIONS
                    ================================================== */}

                    <div className="hod-modal-actions">


                        {/* CANCEL */}

                        <button
                            type="button"
                            className="hod-modal-cancel"
                            onClick={handleClose}
                            disabled={loading}
                        >

                            Cancel

                        </button>


                        {/* CREATE */}

                        <button
                            type="submit"
                            className="hod-modal-submit"
                            disabled={loading}
                        >

                            {loading ? (

                                <>

                                    <span className="hod-spinner" />

                                    Creating HOD...

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