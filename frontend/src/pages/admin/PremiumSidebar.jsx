import Logo from "../../pages/admin/Logo";
import SidebarMenu from "../../pages/admin/SidebarMenu";

const PremiumSidebar = () => {
  return (
    <div className="premium-sidebar-content">
      <Logo />

     <div className="rx-sidebar-menu">
    <SidebarMenu />
</div>
    </div>
  );
};

export default PremiumSidebar;