const SidebarSection = ({ title, children }) => {
    return (
        <section className="rx-sidebar-section">

            {/* Section Title */}
            <h4 className="rx-sidebar-section-title">
                {title}
            </h4>

            {/* Section Items */}
            <div className="rx-sidebar-section-items">
                {children}
            </div>

        </section>
    );
};

export default SidebarSection;