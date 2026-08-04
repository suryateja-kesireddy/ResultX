const SidebarSection = ({ title, children }) => {
  return (
    <div className="rx-sidebar-section">
      <h4 className="rx-sidebar-section-title">
        {title}
      </h4>

      <div className="rx-sidebar-section-items">
        {children}
      </div>
    </div>
  );
};

export default SidebarSection;