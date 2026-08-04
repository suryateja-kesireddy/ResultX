import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";
import LatestResults from "./LatestResults";
import UpcomingExams from "./UpcomingExams";

const DashboardBody = () => {
  return (
    <div className="rx-dashboard-body">

      <div className="rx-dashboard-row">

        <RecentActivity />

        <QuickActions />

      </div>

      <div className="rx-dashboard-row">

        <LatestResults />

        <UpcomingExams />

      </div>

    </div>
  );
};

export default DashboardBody;