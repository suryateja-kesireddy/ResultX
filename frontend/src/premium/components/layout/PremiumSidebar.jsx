import Logo from "../navigation/Logo";
import SidebarMenu from "../navigation/SidebarMenu";

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