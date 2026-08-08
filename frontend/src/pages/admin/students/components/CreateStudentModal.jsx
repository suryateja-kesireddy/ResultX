import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    UserPlus,
    Eye,
    EyeOff,
    X,
} from "lucide-react";
import toast from "react-hot-toast";

import {
    createStudent,
} from "../../../../services/student/studentService";

import {
    getAllDepartments,
} from "../../../../services/department/departmentService";

import {
    getSemesters,
} from "../../../../services/semester/semesterService";

export default function CreateStudentModal({
    open,
    onClose,
    onSuccess,
}) {

    // =====================================================
    // STATE
    // =====================================================

    const [departments, setDepartments] = useState([]);

    const [semesters, setSemesters] = useState([]);

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        hallTicket: "",
        phone: "",
        departmentId: "",
        semesterId: "",
        section: "A",
    });


    // =====================================================
    // LOAD DEPARTMENTS + SEMESTERS
    // =====================================================

    useEffect(() => {

        if (open) {
            loadData();
        }

    }, [open]);


    const loadData = async () => {

        try {

            const departmentData =
                await getAllDepartments();

            const semesterData =
                await getSemesters();

            setDepartments(
                departmentData || []
            );

            setSemesters(
                semesterData || []
            );

        } catch (error) {

            console.error(
                "Failed to load student form data:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to load departments and semesters"
            );
        }
    };


    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

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


    // =====================================================
    // HANDLE PHONE
    // =====================================================

    const handlePhoneChange = (e) => {

        const value = e.target.value
            .replace(/\D/g, "")
            .slice(0, 10);

        setFormData((prev) => ({
            ...prev,
            phone: value,
        }));
    };


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setFormData({
            name: "",
            email: "",
            password: "",
            hallTicket: "",
            phone: "",
            departmentId: "",
            semesterId: "",
            section: "A",
        });

        setShowPassword(false);
    };


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const handleClose = () => {

        // Don't close while creating
        if (loading) {
            return;
        }

        resetForm();

        onClose();
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Prevent double click / multiple requests
        if (loading) {
            return;
        }


        // =================================================
        // FRONTEND VALIDATION
        // =================================================

        if (!formData.name.trim()) {

            toast.error(
                "Please enter student name"
            );

            return;
        }


        if (!formData.email.trim()) {

            toast.error(
                "Please enter student email"
            );

            return;
        }


        if (!formData.password) {

            toast.error(
                "Please enter password"
            );

            return;
        }


        if (!formData.hallTicket.trim()) {

            toast.error(
                "Please enter hall ticket number"
            );

            return;
        }


        if (!formData.departmentId) {

            toast.error(
                "Please select department"
            );

            return;
        }


        if (!formData.semesterId) {

            toast.error(
                "Please select semester"
            );

            return;
        }


        // =================================================
        // START LOADING
        // =================================================

        setLoading(true);


        try {

            // =================================================
            // API REQUEST
            // =================================================

            await createStudent({

                ...formData,

                name: formData.name.trim(),

                email: formData.email
                    .trim()
                    .toLowerCase(),

                hallTicket:
                    formData.hallTicket.trim(),

                departmentId:
                    Number(formData.departmentId),

                semesterId:
                    Number(formData.semesterId),

            });


            // =================================================
            // SUCCESS TOAST
            // =================================================

            toast.success(
                "Student created successfully",
                {
                    duration: 3000,
                }
            );


            // =================================================
            // RESET
            // =================================================

            resetForm();


            // =================================================
            // REFRESH STUDENT LIST
            // =================================================

            if (onSuccess) {
                onSuccess();
            }


            // =================================================
            // CLOSE MODAL
            // =================================================

            onClose();

        } catch (error) {

            console.error(
                "Failed to create student:",
                error
            );


            // =================================================
            // BACKEND ERROR MESSAGE
            // =================================================

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create student";


            const lowerMessage =
                message.toLowerCase();


            // =================================================
            // EXISTING EMAIL
            // =================================================

            if (
                lowerMessage.includes(
                    "email already exists"
                )
            ) {

                toast.error(
                    "Email already exists",
                    {
                        duration: 3500,
                    }
                );

            }

            // =================================================
            // EXISTING HALL TICKET
            // =================================================

            else if (
                lowerMessage.includes(
                    "hall ticket already exists"
                )
            ) {

                toast.error(
                    "Hall Ticket already exists",
                    {
                        duration: 3500,
                    }
                );

            }

            // =================================================
            // EXISTING PHONE
            // =================================================

            else if (
                lowerMessage.includes(
                    "phone already exists"
                )
            ) {

                toast.error(
                    "Phone number already exists",
                    {
                        duration: 3500,
                    }
                );

            }

            // =================================================
            // OTHER ERROR
            // =================================================

            else {

                toast.error(
                    message,
                    {
                        duration: 3500,
                    }
                );
            }

        } finally {

            // =================================================
            // STOP LOADING
            // =================================================

            setLoading(false);
        }
    };


    // =====================================================
    // DON'T RENDER
    // =====================================================

    if (!open) {
        return null;
    }


    // =====================================================
    // MODAL
    // =====================================================

    return createPortal(

        <div
            className="student-modal-overlay"
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
                className="student-modal"
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="student-modal-header">

                    <div className="student-modal-title">

                        <div className="student-modal-icon">
                            <UserPlus size={24} />
                        </div>

                        <div>

                            <h2>
                                Create Student
                            </h2>

                            <p>
                                Add a new student to
                                SRK Institute of Technology.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        CLOSE BUTTON
                    ================================================= */}

                    <button
                        type="button"
                        className="student-modal-close"
                        onClick={handleClose}
                        disabled={loading}
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    className="student-form"
                    onSubmit={handleSubmit}
                >

                    <div className="student-form-grid">

                        {/* =================================================
                            NAME
                        ================================================= */}

                        <div className="student-form-group">

                            <label>
                                Student Name
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter student name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />

                        </div>


                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <div className="student-form-group">

                            <label>
                                Email
                                <span>*</span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                autoComplete="new-email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />

                        </div>


                        {/* =================================================
                            PASSWORD
                        ================================================= */}

                        <div className="student-form-group">

                            <label>
                                Password
                                <span>*</span>
                            </label>

                            <div className="student-password-wrapper">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Enter password"
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={loading}
                                    required
                                />

                                <button
                                    type="button"
                                    className="student-password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            (prev) =>
                                                !prev
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


                        {/* =================================================
                            HALL TICKET
                        ================================================= */}

                        <div className="student-form-group">

                            <label>
                                Hall Ticket
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="hallTicket"
                                placeholder="Hall ticket number"
                                value={
                                    formData.hallTicket
                                }
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />

                        </div>


                        {/* =================================================
                            PHONE
                        ================================================= */}

                        <div className="student-form-group">

                            <label>
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone number"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handlePhoneChange
                                }
                                disabled={loading}
                                maxLength={10}
                                inputMode="numeric"
                            />

                        </div>


                        {/* =================================================
                            DEPARTMENT
                        ================================================= */}

                        <div className="student-form-group">

                            <label>
                                Department
                                <span>*</span>
                            </label>

                            <select
                                name="departmentId"
                                value={
                                    formData.departmentId
                                }
                                onChange={handleChange}
                                disabled={loading}
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


                        {/* =================================================
                            SEMESTER
                        ================================================= */}

                        <div className="student-form-group">

                            <label>
                                Semester
                                <span>*</span>
                            </label>

                            <select
                                name="semesterId"
                                value={
                                    formData.semesterId
                                }
                                onChange={handleChange}
                                disabled={loading}
                                required
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
                                                semester.type
                                            }
                                            )
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* =================================================
                            SECTION
                        ================================================= */}

                        <div className="student-form-group">

                            <label>
                                Section
                            </label>

                            <select
                                name="section"
                                value={
                                    formData.section
                                }
                                onChange={handleChange}
                                disabled={loading}
                            >

                                <option value="A">
                                    A
                                </option>

                                <option value="B">
                                    B
                                </option>

                                <option value="C">
                                    C
                                </option>

                                <option value="D">
                                    D
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div className="student-modal-actions">

                        {/* CANCEL */}

                        <button
                            type="button"
                            className="student-cancel-btn"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>


                        {/* CREATE */}

                        <button
                            type="submit"
                            className="student-save-btn"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="student-spinner" />

                                    Creating Student...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} />

                                    Create Student
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