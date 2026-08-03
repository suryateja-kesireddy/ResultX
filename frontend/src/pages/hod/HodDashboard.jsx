import { useEffect, useState } from "react";
import { getDashboardStats, getHodProfile } from "../../services/hodService";

import "../../styles/hod/hod-dashboard.css";

import DashboardHeader from "../../components/hod/DashboardHeader";
import StatsGrid from "../../components/hod/StatsGrid";



function HodDashboard() {
  const [hod, setHod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
  try {
    const [profileData, statsData] = await Promise.all([
      getHodProfile(),
      getDashboardStats(),
    ]);

    setHod(profileData);
    setStats(statsData);

  } catch (error) {
    console.error("Failed to load dashboard", error);
  } finally {
    setLoading(false);
  }
};
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="hod-dashboard">
      

      <DashboardHeader
        name={hod?.user?.name}
        department={hod?.department?.name}
      />

      <StatsGrid />

    </div>
  );
}

export default HodDashboard;