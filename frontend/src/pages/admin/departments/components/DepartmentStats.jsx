import { useEffect, useState } from "react";

import {
    Building2,
    GraduationCap,
    Laptop,
    Cpu,
    Brain,
    Database,
} from "lucide-react";

import {
    getDepartmentStats,
} from "../../../../services/department/departmentService";

import DepartmentCard from "./DepartmentCard";

export default function DepartmentStats({
    selectedDepartment,
    onDepartmentChange,
}) {

    const [stats, setStats] = useState({
        totalDepartments: 0,
        departments: [],
    });


    /* =====================================================
       LOAD DEPARTMENT STATISTICS
    ===================================================== */

    useEffect(() => {
        loadDepartmentStats();
    }, []);


    const loadDepartmentStats = async () => {

        try {

            const data = await getDepartmentStats();

            setStats(data);

        } catch (error) {

            console.error(
                "Failed to load department statistics:",
                error
            );

        }

    };


    /* =====================================================
       DEPARTMENT ICONS
    ===================================================== */

    const iconMap = {

        MCA: <GraduationCap size={34} />,

        CSE: <Laptop size={34} />,

        ECE: <Cpu size={34} />,

        AIML: <Brain size={34} />,

        IT: <Database size={34} />,

    };


    /* =====================================================
       DEPARTMENT COLORS
    ===================================================== */

    const colorMap = {

        TOTAL: "#2563eb",

        MCA: "#7c3aed",

        CSE: "#16a34a",

        ECE: "#ea580c",

        AIML: "#4f46e5",

        IT: "#0891b2",

    };


    return (

        <div className="department-stats-grid">


            {/* =================================================
                TOTAL DEPARTMENTS
            ================================================= */}

            <DepartmentCard

                title="Total Departments"

                students={stats.totalDepartments}

                faculties="-"

                hods="-"

                subjects="-"

                icon={
                    <Building2 size={34} />
                }

                color={colorMap.TOTAL}

                active={
                    selectedDepartment === "ALL"
                }

                onClick={() =>
                    onDepartmentChange("ALL")
                }

            />


            {/* =================================================
                DEPARTMENT CARDS
            ================================================= */}

            {stats.departments.map(
                (department) => (

                    <DepartmentCard

                        key={department.id}

                        title={department.code}

                        students={
                            department.students
                        }

                        faculties={
                            department.faculties
                        }

                        hods={
                            department.hods
                        }

                        subjects={
                            department.subjects
                        }

                        icon={
                            iconMap[
                                department.code
                            ] || (
                                <Building2 size={34} />
                            )
                        }

                        color={
                            colorMap[
                                department.code
                            ] || "#2563eb"
                        }

                        active={
                            selectedDepartment?.id ===
                            department.id
                        }

                        onClick={() =>
                            onDepartmentChange(
                                department
                            )
                        }

                    />

                )
            )}

        </div>

    );
}