import DashboardHeader from "../../components/dashboard/admin/DashboardHeader";
import StatsGrid from "../../components/dashboard/admin/StatsGrid";
import DashboardBody from "../../components/dashboard/admin/DashboardBody";

const AdminUIDemo = () => {
  return (
    <>
      <DashboardHeader />
      <StatsGrid />
      <DashboardBody />
    </>
  );
};

export default AdminUIDemo;