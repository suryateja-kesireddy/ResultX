import sidebarConfig from "../../sidebar.config";

import SidebarSection from "./SidebarSection";
import SidebarItem from "./SidebarItem";

const SidebarMenu = () => {
  return (
    <>
      {sidebarConfig.map((section) => (
        <SidebarSection
          key={section.title}
          title={section.title}
        >
          {section.items.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              to={item.path}
            />
          ))}
        </SidebarSection>
      ))}
    </>
  );
};

export default SidebarMenu;