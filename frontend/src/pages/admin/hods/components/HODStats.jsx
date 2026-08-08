import { useEffect, useState } from "react";

import {
    Users,
    GraduationCap,
    Laptop,
    Cpu,
    Brain,
    Database,
} from "lucide-react";

import { getHODStats } from "../../../../services/hod/hodService";

import HODStatCard from "./HODStatCard";

export default function HODStats({
    selectedDepartment,
    onDepartmentChange,
    refreshKey,
}) {
    const [stats, setStats] = useState({
        totalHODs: 0,
        departments: [],
    });

    // ==========================================
    // Load Statistics
    // ==========================================

    useEffect(() => {
        loadStats();
    }, [refreshKey]);

    const loadStats = async () => {
        try {
            const data = await getHODStats();

            setStats(data);
        } catch (error) {
            console.error(
                "Failed to fetch HOD stats:",
                error
            );
        }
    };

    // ==========================================
    // Department Icons
    // ==========================================

    const iconMap = {
        MCA: <GraduationCap size={28} />,
        CSE: <Laptop size={28} />,
        ECE: <Cpu size={28} />,
        AIML: <Brain size={28} />,
        IT: <Database size={28} />,
    };

    // ==========================================
    // Department Colors
    // ==========================================

    const colorMap = {
        TOTAL: "#2563eb",
        MCA: "#7c3aed",
        CSE: "#16a34a",
        ECE: "#ea580c",
        AIML: "#4f46e5",
        IT: "#0891b2",
    };

    return (
        <div className="hod-stats-grid">

            {/* ==================================
                TOTAL
            ================================== */}

            <HODStatCard
                title="Total"
                count={stats.totalHODs}
                subtitle="HODs"
                icon={
                    <Users size={28} />
                }
                color={colorMap.TOTAL}
                active={
                    selectedDepartment === "ALL"
                }
                onClick={() =>
                    onDepartmentChange("ALL")
                }
            />


            {/* ==================================
                DEPARTMENTS
            ================================== */}

            {stats.departments.map(
                (department) => (

                    <HODStatCard
                        key={department.id}

                        title={department.code}

                        count={department.count}

                        subtitle="HODs"

                        icon={
                            iconMap[
                                department.code
                            ] || (
                                <Users size={28} />
                            )
                        }

                        color={
                            colorMap[
                                department.code
                            ] || "#2563eb"
                        }

                        active={
                            selectedDepartment ===
                            department.code
                        }

                        onClick={() =>
                            onDepartmentChange(
                                department.code
                            )
                        }
                    />

                )
            )}

        </div>
    );
}