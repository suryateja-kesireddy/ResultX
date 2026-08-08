import { useEffect, useState } from "react";

import StudentStats from "./components/StudentStats";
import StudentFilters from "./components/StudentFilters";
import StudentTable from "./components/StudentTable";
import CreateStudentModal from "./components/CreateStudentModal";

import {
    getStudents,
} from "../../../services/student/studentService";

import "../../../styles/dashboard/admin/student.css";


export default function Students() {

    const [students, setStudents] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const [selectedDepartment, setSelectedDepartment] =
        useState("ALL");

    const [filters, setFilters] = useState({
        search: "",
        department: "",
        semester: "",
        status: "",
    });


    /* ==========================================================
       LOAD STUDENTS
    ========================================================== */

    useEffect(() => {
        loadStudents();
    }, []);


    const loadStudents = async () => {

        try {

            const data = await getStudents();

            setStudents(data);

        } catch (error) {

            console.error(
                "Failed to load students:",
                error
            );

        }

    };


    /* ==========================================================
       FILTER STUDENTS
    ========================================================== */

    const filteredStudents = students.filter((student) => {

        /* ------------------------------------------------------
           SEARCH
        ------------------------------------------------------ */

        const searchValue =
            filters.search
                .toLowerCase()
                .trim();


        const studentName =
            student.name
                ?.toLowerCase() || "";


        const hallTicket =
            student.hallTicket
                ?.toLowerCase() || "";


        const email =
            student.email
                ?.toLowerCase() || "";


        const matchesSearch =
            !searchValue ||
            studentName.includes(searchValue) ||
            hallTicket.includes(searchValue) ||
            email.includes(searchValue);


        /* ------------------------------------------------------
           DEPARTMENT
        ------------------------------------------------------ */

        const departmentCode =
            student.department?.code
                ?.toLowerCase() || "";


        const departmentName =
            student.department?.name
                ?.toLowerCase() || "";


        const selectedDepartment =
            filters.department
                ?.toLowerCase() || "";


        const matchesDepartment =
            !selectedDepartment ||
            departmentCode === selectedDepartment ||
            departmentName === selectedDepartment;


        /* ------------------------------------------------------
           SEMESTER
        ------------------------------------------------------ */

        const studentSemester =
            String(
                student.semester?.number ?? ""
            );


        const matchesSemester =
            !filters.semester ||
            studentSemester ===
                String(filters.semester);


        /* ------------------------------------------------------
           STATUS
        ------------------------------------------------------ */

        const isActive =
            student.user?.isActive;


        const matchesStatus =
            !filters.status ||
            (
                filters.status === "ACTIVE" &&
                isActive === true
            ) ||
            (
                filters.status === "INACTIVE" &&
                isActive === false
            );


        /* ------------------------------------------------------
           FINAL RESULT
        ------------------------------------------------------ */

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesSemester &&
            matchesStatus
        );

    });


    /* ==========================================================
       RESET FILTERS
    ========================================================== */

    const handleReset = () => {

        setFilters({
            search: "",
            department: "",
            semester: "",
            status: "",
        });

        setSelectedDepartment("ALL");

    };


    /* ==========================================================
       RENDER
    ========================================================== */

    return (

        <div className="student-page">


            {/* ==================================================
                HERO
            ================================================== */}

            <div className="student-header">

                <div className="student-header-content">

                    <h1>
                        Student Management
                    </h1>

                    <p>
                        Manage all students of
                        SRK Institute of Technology.
                        Create, edit and organize
                        student records.
                    </p>

                </div>


                <button
                    type="button"
                    className="student-add-btn"
                    onClick={() =>
                        setOpenModal(true)
                    }
                >
                    + Add Student
                </button>

            </div>


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <StudentStats
                selectedDepartment={
                    selectedDepartment
                }
                onDepartmentChange={
                    setSelectedDepartment
                }
            />


            {/* ==================================================
                FILTERS
            ================================================== */}

            <StudentFilters
                filters={filters}
                setFilters={setFilters}
            />


            {/* ==================================================
                TABLE
            ================================================== */}

            <StudentTable
                students={filteredStudents}
                onRefresh={loadStudents}
            />


            {/* ==================================================
                CREATE STUDENT
            ================================================== */}

            <CreateStudentModal
                open={openModal}

                onClose={() =>
                    setOpenModal(false)
                }

                onSuccess={() => {

                    loadStudents();

                    setOpenModal(false);

                }}
            />

        </div>

    );

}