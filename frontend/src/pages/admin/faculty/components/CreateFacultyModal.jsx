import { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { createFaculty } from "../../../../services/faculty/facultyService";
import { getAllDepartments } from "../../../../services/department/departmentService";

export default function CreateFacultyModal({
    open,
    onClose,
    onSuccess,
}) {
    const [departments, setDepartments] = useState([]);

    const [loading, setLoading] = useState(false);

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


    // ==========================================================
    // LOAD DEPARTMENTS
    // ==========================================================

    useEffect(() => {

        if (open) {
            loadDepartments();
        }

    }, [open]);


    const loadDepartments = async () => {

        try {

            const data = await getAllDepartments();

            setDepartments(data || []);

        } catch (error) {

            console.error(
                "Failed to load departments:",
                error
            );

            toast.error(
                "Failed to load departments"
            );

        }

    };


    // ==========================================================
    // HANDLE INPUT
    // ==========================================================

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


    // ==========================================================
    // RESET FORM
    // ==========================================================

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

    };


    // ==========================================================
    // HANDLE SUBMIT
    // ==========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Prevent double submission

        if (loading) {
            return;
        }


        try {

            setLoading(true);


            // ==================================================
            // CREATE FACULTY
            // ==================================================

            await createFaculty({

                ...formData,

                departmentId:
                    Number(
                        formData.departmentId
                    ),

                experience:
                    formData.experience
                        ? Number(
                            formData.experience
                        )
                        : null,

            });


            // ==================================================
            // SUCCESS TOAST
            // ==================================================

            toast.success(
                "Faculty created successfully!",
                {
                    duration: 3000,
                }
            );


            // ==================================================
            // RESET
            // ==================================================

            resetForm();


            // ==================================================
            // REFRESH FACULTY LIST
            // ==================================================

            if (onSuccess) {
                onSuccess();
            }


            // ==================================================
            // CLOSE MODAL
            // ==================================================

            onClose();


        } catch (error) {

            console.error(
                "Create Faculty failed:",
                error
            );


            // ==================================================
            // GET BACKEND ERROR MESSAGE
            // ==================================================

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create Faculty";


            // ==================================================
            // EMPLOYEE ID ALREADY EXISTS
            // ==================================================

            if (
                message
                    .toLowerCase()
                    .includes(
                        "employee id already exists"
                    )
            ) {

                toast.error(
                    "Employee ID already exists",
                    {
                        duration: 4000,
                    }
                );

                return;
            }


            // ==================================================
            // EMAIL ALREADY EXISTS
            // ==================================================

            if (
                message
                    .toLowerCase()
                    .includes(
                        "email already exists"
                    )
            ) {

                toast.error(
                    "Email already exists",
                    {
                        duration: 4000,
                    }
                );

                return;
            }


            // ==================================================
            // DEPARTMENT NOT FOUND
            // ==================================================

            if (
                message
                    .toLowerCase()
                    .includes(
                        "department not found"
                    )
            ) {

                toast.error(
                    "Selected department was not found",
                    {
                        duration: 4000,
                    }
                );

                return;
            }


            // ==================================================
            // REQUIRED FIELDS
            // ==================================================

            if (
                message
                    .toLowerCase()
                    .includes(
                        "required fields"
                    )
            ) {

                toast.error(
                    "Please fill all required fields",
                    {
                        duration: 4000,
                    }
                );

                return;
            }


            // ==================================================
            // GENERIC ERROR
            // ==================================================

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


    // ==========================================================
    // CLOSED
    // ==========================================================

    if (!open) {
        return null;
    }


    // ==========================================================
    // MODAL
    // ==========================================================

    return (

        <div className="faculty-modal-overlay">

            <div className="faculty-modal">

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
                        onClick={onClose}
                        disabled={loading}
                    >
                        ×
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

                    {/* Faculty Name */}

                    <div className="faculty-form-group">

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


                    {/* Email */}

                    <div className="faculty-form-group">

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


                    {/* Password */}

                    <div className="faculty-form-group">

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />

                    </div>


                    {/* Employee ID */}

                    <div className="faculty-form-group">

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


                    {/* Phone */}

                    <div className="faculty-form-group">

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength="10"
                            disabled={loading}
                        />

                    </div>


                    {/* Qualification */}

                    <div className="faculty-form-group">

                        <input
                            type="text"
                            name="qualification"
                            placeholder="Qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            disabled={loading}
                        />

                    </div>


                    {/* Experience */}

                    <div className="faculty-form-group">

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


                    {/* Department */}

                    <div className="faculty-form-group">

                        <select
                            name="departmentId"
                            value={formData.departmentId}
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
                                        {department.name}
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
                        disabled={loading}
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

        </div>

    );
}