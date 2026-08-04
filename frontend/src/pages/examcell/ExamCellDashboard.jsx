import "../../styles/dashboard/examcell/dashboard.css";

import DashboardHeader from "../../components/dashboard/examcell/DashboardHeader";
import StatsGrid from "../../components/dashboard/examcell/StatsGrid";
import QuickActions from "../../components/dashboard/examcell/QuickActions";
import UpcomingExams from "../../components/dashboard/examcell/UpcomingExams";
import RecentResults from "../../components/dashboard/examcell/RecentResults";
import RecentActivity from "../../components/dashboard/examcell/RecentActivity";

function ExamCellDashboard() {
  return (
    <div className="examcell-dashboard">

      <DashboardHeader />

      <StatsGrid />

      <QuickActions />

      <div className="examcell-dashboard-grid">

        <UpcomingExams />

        <RecentResults />

        <div className="examcell-full-width">
          <RecentActivity />
        </div>

      </div>

    </div>
  );
}

export default ExamCellDashboard;