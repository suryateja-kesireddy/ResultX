import {
  Bell,
  Moon,
  Settings,
} from "lucide-react";

const TopbarActions = () => {
  return (
    <div className="rx-topbar-actions">

      <button className="rx-action-btn">
        <Moon size={18} />
      </button>

      <button className="rx-action-btn">
        <Bell size={18} />
      </button>

      <button className="rx-action-btn">
        <Settings size={18} />
      </button>

    </div>
  );
};

export default TopbarActions;