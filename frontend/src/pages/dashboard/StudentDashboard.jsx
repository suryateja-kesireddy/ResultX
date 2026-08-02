import DashboardHeader from "../../components/dashboard/student/DashboardHeader";
import ProfileCard from "../../components/dashboard/student/ProfileCard";
import StatsSection from "../../components/dashboard/student/StatsSection";
import RecentResults from "../../components/dashboard/student/RecentResults";
import NotificationPanel from "../../components/dashboard/student/NotificationPanel";
import PerformanceChart from "../../components/dashboard/student/PerformanceChart";
import QuickActions from "../../components/dashboard/student/QuickActions";

function StudentDashboard() {
  return (
    <>
      <DashboardHeader />

      <ProfileCard />

      <StatsSection />

      <div className="dashboard-grid">
        <RecentResults />
        <NotificationPanel />
      </div>

      <PerformanceChart />

      <QuickActions />
    </>
  );
}

export default StudentDashboard;