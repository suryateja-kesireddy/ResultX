import { useEffect, useState } from "react";

import {
    BookOpen,
    GraduationCap,
    Building2,
    Briefcase,
    School,
    Landmark,
} from "lucide-react";

import { getCourseStats } from "../../../../services/course/courseService";

import CourseCard from "./CourseCard";

export default function CourseStats({
    selectedCourse,
    onCourseChange,
}) {
    const [stats, setStats] = useState({
        totalCourses: 0,
        courses: [],
    });

    // =========================================================
    // LOAD COURSE STATISTICS
    // =========================================================

    useEffect(() => {
        loadCourseStats();
    }, []);

    const loadCourseStats = async () => {
        try {
            const data = await getCourseStats();

            setStats({
                totalCourses: data?.totalCourses || 0,
                courses: data?.courses || [],
            });

        } catch (error) {
            console.error(
                "Failed to load course statistics:",
                error
            );
        }
    };

    // =========================================================
    // COURSE ICONS
    // =========================================================

    const iconMap = {
        MCA: <GraduationCap size={34} />,
        MBA: <Briefcase size={34} />,
        "B.Tech": <Building2 size={34} />,
        "M.Tech": <School size={34} />,
        BCA: <BookOpen size={34} />,
        BSc: <Landmark size={34} />,
    };

    // =========================================================
    // COURSE COLORS
    // =========================================================

    const colorMap = {
        TOTAL: "#2563eb",

        MCA: "#7c3aed",

        MBA: "#ea580c",

        "B.Tech": "#16a34a",

        "M.Tech": "#0ea5e9",

        BCA: "#0891b2",

        BSc: "#4f46e5",
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <div className="course-stats-grid">

            {/* =================================================
                TOTAL COURSES
            ================================================= */}

            <CourseCard
                title="Total Courses"

                departments={
                    stats.totalCourses
                }

                students="-"

                faculties="-"

                hods="-"

                subjects="-"

                icon={
                    <BookOpen size={34} />
                }

                color={
                    colorMap.TOTAL
                }

                active={
                    selectedCourse === null
                }

                onClick={() =>
                    onCourseChange(null)
                }
            />


            {/* =================================================
                INDIVIDUAL COURSES
            ================================================= */}

            {stats.courses.map(
                (course) => (
                    <CourseCard
                        key={course.id}

                        title={
                            course.name
                        }

                        departments={
                            course.departments ??
                            0
                        }

                        students={
                            course.students ??
                            0
                        }

                        faculties={
                            course.faculties ??
                            0
                        }

                        hods={
                            course.hods ??
                            0
                        }

                        subjects={
                            course.subjects ??
                            0
                        }

                        icon={
                            iconMap[
                                course.name
                            ] || (
                                <BookOpen
                                    size={34}
                                />
                            )
                        }

                        color={
                            colorMap[
                                course.name
                            ] || "#2563eb"
                        }

                        active={
                            selectedCourse?.id ===
                            course.id
                        }

                        onClick={() =>
                            onCourseChange(
                                course
                            )
                        }
                    />
                )
            )}

        </div>
    );
}