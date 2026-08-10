import { useEffect, useState } from "react";

import {
    getDashboardStats,
    getHodProfile,
} from "../../services/hod/hodService";

import "../../styles/dashboard/hod/dashboard.css";

import DashboardHeader from "../../components/dashboard/hod/DashboardHeader";
import StatsGrid from "../../components/dashboard/hod/StatsGrid";

function HodDashboard() {

    const [hod, setHod] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const [
                profileData,
                statsData,
            ] = await Promise.all([
                getHodProfile(),
                getDashboardStats(),
            ]);

            console.log("HOD Profile:", profileData);
            console.log("HOD Dashboard Stats:", statsData);

            setHod(profileData);
            setStats(statsData);

        } catch (error) {

            console.error(
                "Failed to load HOD dashboard:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                Loading...
            </div>
        );
    }

    return (
        <div className="hod-dashboard">

            {/* ================= HEADER ================= */}

            <DashboardHeader
                name={hod?.user?.name}
                department={hod?.department?.code}
            />

            {/* ================= STATISTICS ================= */}

            <StatsGrid
                stats={stats}
            />

        </div>
    );
}

export default HodDashboard;