import { useEffect, useState } from "react";

import DashboardHeader from "../../components/dashboard/student/DashboardHeader";
import ProfileCard from "../../components/dashboard/student/ProfileCard";
import StatsSection from "../../components/dashboard/student/StatsSection";
import RecentResults from "../../components/dashboard/student/RecentResults";
import NotificationPanel from "../../components/dashboard/student/NotificationPanel";
import PerformanceChart from "../../components/dashboard/student/PerformanceChart";
import QuickActions from "../../components/dashboard/student/QuickActions";

import {
    getStudentProfile,
} from "../../services/student/studentService";


function StudentDashboard() {

    const [student, setStudent] = useState(null);

    const [loading, setLoading] =
        useState(true);


    /* ==========================================================
       LOAD LOGGED-IN STUDENT PROFILE
    ========================================================== */

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            const data =
                await getStudentProfile();

            console.log(
                "✅ Student Profile:",
                data
            );

            setStudent(data);

        } catch (error) {

            console.error(
                "❌ Failed to load student profile:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    /* ==========================================================
       LOADING
    ========================================================== */

    if (loading) {

        return (
            <div className="student-dashboard-loading">
                Loading student profile...
            </div>
        );

    }


    /* ==========================================================
       DASHBOARD
    ========================================================== */

    return (
        <>

            {/* ==================================================
                DASHBOARD HEADER
            ================================================== */}

            <DashboardHeader
                name={student?.user?.name}
                department={
                    student?.department?.name
                }
                semester={
                    student?.semester?.number
                }
                section={
                    student?.section
                }
            />


            {/* ==================================================
                STUDENT PROFILE
            ================================================== */}

            <ProfileCard
                name={student?.user?.name}
                hallTicket={
                    student?.hallTicket
                }
                department={
                  student?.department?.code
                }
                
                semester={
                    student?.semester?.number
                }
                section={
                    student?.section
                }
            />


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <StatsSection />


            {/* ==================================================
                RECENT RESULTS + NOTIFICATIONS
            ================================================== */}

            <div className="dashboard-grid">

                <RecentResults />

                <NotificationPanel />

            </div>


            {/* ==================================================
                PERFORMANCE
            ================================================== */}

            <PerformanceChart />


            {/* ==================================================
                QUICK ACTIONS
            ================================================== */}

            <QuickActions />

        </>
    );

}


export default StudentDashboard;