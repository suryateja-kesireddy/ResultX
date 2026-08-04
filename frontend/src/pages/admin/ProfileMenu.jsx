import {
  ChevronDown,
  User,
} from "lucide-react";

const ProfileMenu = () => {
  return (
    <div className="rx-profile">

      <div className="rx-avatar">
        <User size={22} />
      </div>

      <div className="rx-profile-info">

        <h4>Administrator</h4>

        <span>● Online</span>

      </div>

      <ChevronDown size={18} />

    </div>
  );
};

export default ProfileMenu;