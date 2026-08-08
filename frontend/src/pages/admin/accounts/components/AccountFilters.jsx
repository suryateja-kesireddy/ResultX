import { useEffect, useState } from "react";
import { RotateCcw, Search } from "lucide-react";

import {
    getAllDepartments,
} from "../../../../services/department/departmentService";

export default function AccountFilters({
    filters,
    setFilters,
}) {
    const [departments, setDepartments] = useState([]);

    // ==========================================
    // Load Departments
    // ==========================================
    useEffect(() => {
        loadDepartments();
    }, []);

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
    // Handle Filter Change
    // ==========================================
    const handleChange = (name, value) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // Reset Filters
    // ==========================================
    const handleReset = () => {
        setFilters({
            search: "",
            role: "",
            department: "",
            status: "",
        });
    };

    return (
        <div className="account-filters">

            {/* ==================================
                SEARCH
            ================================== */}

            <div className="account-search">

                <Search size={20} />

                <input
                    type="text"
                    placeholder="Search by name, username or email..."
                    value={filters.search}
                    onChange={(e) =>
                        handleChange(
                            "search",
                            e.target.value
                        )
                    }
                />

            </div>


            {/* ==================================
                ROLE
            ================================== */}

            <select
                value={filters.role}
                onChange={(e) =>
                    handleChange(
                        "role",
                        e.target.value
                    )
                }
            >

                <option value="">
                    All Roles
                </option>

                <option value="STUDENT">
                    Student
                </option>

                <option value="HOD">
                    HOD
                </option>

                <option value="FACULTY">
                    Faculty
                </option>

                <option value="EXAM_CELL">
                    Exam Cell
                </option>

                <option value="ADMIN">
                    Admin
                </option>

            </select>


            {/* ==================================
                DEPARTMENT
            ================================== */}

            <select
                value={filters.department}
                onChange={(e) =>
                    handleChange(
                        "department",
                        e.target.value
                    )
                }
            >

                <option value="">
                    All Departments
                </option>

                {departments.map((department) => (
                    <option
                        key={department.id}
                        value={department.code}
                    >
                        {department.name}
                    </option>
                ))}

            </select>


            {/* ==================================
                STATUS
            ================================== */}

            <select
                value={filters.status}
                onChange={(e) =>
                    handleChange(
                        "status",
                        e.target.value
                    )
                }
            >

                <option value="">
                    All Status
                </option>

                <option value="ACTIVE">
                    Active
                </option>

                <option value="INACTIVE">
                    Inactive
                </option>

            </select>


            {/* ==================================
                RESET
            ================================== */}

            <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
            >

                <RotateCcw size={18} />

                Reset

            </button>

        </div>
    );
}