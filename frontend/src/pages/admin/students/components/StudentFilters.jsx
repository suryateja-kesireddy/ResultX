import {
    Search,
    RotateCcw,
} from "lucide-react";


export default function StudentFilters({
    filters,
    setFilters,
}) {


    /* ==========================================================
       SEARCH
    ========================================================== */

    const handleSearch = (e) => {

        const value =
            e.target.value;

        setFilters((prev) => ({
            ...prev,
            search: value,
        }));

    };


    /* ==========================================================
       DEPARTMENT
    ========================================================== */

    const handleDepartment = (e) => {

        const value =
            e.target.value;

        setFilters((prev) => ({
            ...prev,
            department: value,
        }));

    };


    /* ==========================================================
       SEMESTER
    ========================================================== */

    const handleSemester = (e) => {

        const value =
            e.target.value;

        setFilters((prev) => ({
            ...prev,
            semester: value,
        }));

    };


    /* ==========================================================
       STATUS
    ========================================================== */

    const handleStatus = (e) => {

        const value =
            e.target.value;

        setFilters((prev) => ({
            ...prev,
            status: value,
        }));

    };


    /* ==========================================================
       RESET
    ========================================================== */

    const handleReset = () => {

        setFilters({
            search: "",
            department: "",
            semester: "",
            status: "",
        });

    };


    return (

        <div className="student-filters">


            {/* ==================================================
                SEARCH
            ================================================== */}

            <div className="student-search">

                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search by Name or Hall Ticket..."
                    value={filters.search}
                    onChange={handleSearch}
                />

            </div>


            {/* ==================================================
                DEPARTMENT
            ================================================== */}

            <select
                value={filters.department}
                onChange={handleDepartment}
            >

                <option value="">
                    All Departments
                </option>

                <option value="MCA">
                    MCA
                </option>

                <option value="CSE">
                    CSE
                </option>

                <option value="ECE">
                    ECE
                </option>

                <option value="IT">
                    IT
                </option>

                <option value="AIML">
                    AIML
                </option>

            </select>


            {/* ==================================================
                SEMESTER
            ================================================== */}

            <select
                value={filters.semester}
                onChange={handleSemester}
            >

                <option value="">
                    All Semesters
                </option>

                {[1, 2, 3, 4, 5, 6, 7, 8].map(
                    (semester) => (

                        <option
                            key={semester}
                            value={semester}
                        >
                            Semester {semester}
                        </option>

                    )
                )}

            </select>


            {/* ==================================================
                STATUS
            ================================================== */}

            


            {/* ==================================================
                RESET
            ================================================== */}

            <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
            >

                <RotateCcw size={16} />

                Reset

            </button>

        </div>

    );

}