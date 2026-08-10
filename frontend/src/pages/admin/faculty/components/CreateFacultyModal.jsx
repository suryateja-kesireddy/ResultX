import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    Plus,
    Loader2,
    X,
    Eye,
    EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

import {
    createFaculty,
} from "../../../../services/faculty/facultyService";

import {
    getAllDepartments,
} from "../../../../services/department/departmentService";


export default function CreateFacultyModal({
    open,
    onClose,
    onSuccess,
}) {

    /* ==========================================================
       STATE
    ========================================================== */

    const [departments, setDepartments] = useState([]);

    const [loading, setLoading] = useState(false);

    const [loadingDepartments, setLoadingDepartments] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        employeeId: "",
        phone: "",
        qualification: "",
        experience: "",
        departmentId: "",
    });


    /* ==========================================================
       LOAD DEPARTMENTS
    ========================================================== */

    useEffect(() => {

        if (!open) {
            return;
        }

        loadDepartments();

    }, [open]);


    const loadDepartments = async () => {

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

            toast.error(message, {
                duration: 4000,
            });

        } finally {

            setLoadingDepartments(false);

        }

    };


    /* ==========================================================
       HANDLE INPUT
    ========================================================== */

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        /* ======================================================
           PHONE NUMBER
        ====================================================== */

        if (name === "phone") {

            /*
             * Remove everything except numbers.
             */

            const digitsOnly =
                value.replace(/\D/g, "");


            /*
             * Maximum 10 digits.
             */

            const limitedPhone =
                digitsOnly.slice(0, 10);


            setFormData((prev) => ({
                ...prev,
                phone: limitedPhone,
            }));

            return;
        }


        /* ======================================================
           OTHER INPUTS
        ====================================================== */

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
            name: "",
            email: "",
            password: "",
            employeeId: "",
            phone: "",
            qualification: "",
            experience: "",
            departmentId: "",
        });

        setShowPassword(false);

    };


    /* ==========================================================
       CLOSE MODAL
    ========================================================== */

    const handleClose = () => {

        /*
         * Don't close while API request is running.
         */

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
           BASIC VALIDATION
        ====================================================== */

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

        const qualification =
            formData.qualification.trim();

        const departmentId =
            formData.departmentId;


        /* ======================================================
           NAME
        ====================================================== */

        if (!name) {

            toast.error(
                "Faculty name is required.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        /* ======================================================
           EMAIL
        ====================================================== */

        if (!email) {

            toast.error(
                "Email address is required.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        /* ======================================================
           PASSWORD
        ====================================================== */

        if (!password) {

            toast.error(
                "Password is required.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        if (password.length < 6) {

            toast.error(
                "Password must be at least 6 characters.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        /* ======================================================
           EMPLOYEE ID
        ====================================================== */

        if (!employeeId) {

            toast.error(
                "Employee ID is required.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        /* ======================================================
           PHONE NUMBER
        ====================================================== */

        if (!phone) {

            toast.error(
                "Phone number is required.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        if (!/^\d{10}$/.test(phone)) {

            toast.error(
                "Phone number must be exactly 10 digits.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        /* ======================================================
           DEPARTMENT
        ====================================================== */

        if (!departmentId) {

            toast.error(
                "Please select a department.",
                {
                    duration: 4000,
                }
            );

            return;
        }


        /* ======================================================
           CREATE FACULTY
        ====================================================== */

        try {

            /*
             * Lock the form immediately.
             */

            setLoading(true);


            await createFaculty({

                name,

                email,

                password,

                employeeId,

                phone,

                qualification,

                departmentId:
                    Number(departmentId),

                experience:
                    formData.experience
                        ? Number(
                            formData.experience
                        )
                        : null,

            });


            /* ==================================================
               SUCCESS
            ================================================== */

            toast.success(
                "Faculty created successfully!",
                {
                    duration: 3000,
                }
            );


            /* ==================================================
               RESET
            ================================================== */

            resetForm();


            /* ==================================================
               REFRESH FACULTY LIST
            ================================================== */

            if (onSuccess) {
                await onSuccess();
            }


            /* ==================================================
               CLOSE
            ================================================== */

            onClose();


        } catch (error) {

            console.error(
                "Create Faculty failed:",
                error
            );


            /* ==================================================
               BACKEND ERROR MESSAGE
            ================================================== */

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.response?.data?.details?.message ||
                error?.message ||
                "Failed to create Faculty.";


            const lowerMessage =
                message.toLowerCase();


            /* ==================================================
               EMPLOYEE ID EXISTS
            ================================================== */

            if (
                lowerMessage.includes(
                    "employee id already exists"
                )
            ) {

                toast.error(
                    "Employee ID already exists.",
                    {
                        duration: 4000,
                    }
                );

                return;
            }


            /* ==================================================
               EMAIL EXISTS
            ================================================== */

            if (
                lowerMessage.includes(
                    "email already exists"
                )
            ) {

                toast.error(
                    "Email already exists.",
                    {
                        duration: 4000,
                    }
                );

                return;
            }


            /* ==================================================
               DEPARTMENT NOT FOUND
            ================================================== */

            if (
                lowerMessage.includes(
                    "department not found"
                )
            ) {

                toast.error(
                    "Selected department was not found.",
                    {
                        duration: 4000,
                    }
                );

                return;
            }


            /* ==================================================
               PHONE ERROR
            ================================================== */

            if (
                lowerMessage.includes(
                    "phone"
                )
            ) {

                toast.error(
                    message,
                    {
                        duration: 4000,
                    }
                );

                return;
            }


            /* ==================================================
               GENERIC BACKEND ERROR
            ================================================== */

            toast.error(
                message,
                {
                    duration: 4000,
                }
            );


        } finally {

            /*
             * Re-enable form after request finishes.
             */

            setLoading(false);

        }

    };


    /* ==========================================================
       ESC KEY
    ========================================================== */

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
            className="faculty-modal-overlay"

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
                className="faculty-modal"

                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >


                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="faculty-modal-header">

                    <div>

                        <h2>
                            Create Faculty
                        </h2>

                        <p>
                            Add a new faculty member
                        </p>

                    </div>


                    <button
                        type="button"
                        className="faculty-modal-close"
                        onClick={handleClose}
                        disabled={loading}
                        aria-label="Close"
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                    className="faculty-create-form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >


                    {/* ==================================================
                        FACULTY NAME
                    ================================================== */}

                    <div className="faculty-form-group">

                        <label>
                            Faculty Name
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Faculty Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* ==================================================
                        EMAIL
                    ================================================== */}

                    <div className="faculty-form-group">

                        <label>
                            Email
                            <span>*</span>
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
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

                    <div className="faculty-form-group">

                        <label>
                            Employee ID
                            <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="employeeId"
                            placeholder="Employee ID"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* ==================================================
                        PHONE
                    ================================================== */}

                    <div className="faculty-form-group">

                        <label>
                            Phone Number
                            <span>*</span>
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="10 digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength={10}
                            inputMode="numeric"
                            pattern="[0-9]{10}"
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* ==================================================
                        QUALIFICATION
                    ================================================== */}

                    <div className="faculty-form-group">

                        <label>
                            Qualification
                        </label>

                        <input
                            type="text"
                            name="qualification"
                            placeholder="Qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            disabled={loading}
                        />

                    </div>


                    {/* ==================================================
                        EXPERIENCE
                    ================================================== */}

                    <div className="faculty-form-group">

                        <label>
                            Experience
                        </label>

                        <input
                            type="number"
                            name="experience"
                            placeholder="Experience (Years)"
                            value={formData.experience}
                            onChange={handleChange}
                            min="0"
                            disabled={loading}
                        />

                    </div>


                    {/* ==================================================
                        DEPARTMENT
                    ================================================== */}

                    <div className="faculty-form-group">

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
                        SUBMIT BUTTON
                    ================================================== */}

                    <button
                        type="submit"
                        className="faculty-submit-btn"
                        disabled={
                            loading ||
                            loadingDepartments
                        }
                    >

                        {loading ? (

                            <>

                                <Loader2
                                    size={21}
                                    className="faculty-loading-icon"
                                />

                                Adding Faculty...

                            </>

                        ) : (

                            <>

                                <Plus size={21} />

                                Add Faculty

                            </>

                        )}

                    </button>

                </form>

            </div>

        </div>,

        document.body

    );

}