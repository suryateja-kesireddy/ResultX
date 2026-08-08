import SearchBar from "./SearchBar";
import TopbarActions from "./TopbarActions";
import ProfileMenu from "./ProfileMenu";

const PremiumTopbar = () => {
  return (
    <header className="premium-topbar">

      {/* Left */}
      <div className="rx-topbar-left">

        <div>
          <h2 className="rx-page-title">
            Dashboard
          </h2>

          <p className="rx-page-subtitle">
            College Result Management System
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="rx-topbar-right">

        <SearchBar />

        <TopbarActions />

        <ProfileMenu />

      </div>

    </header>
  );
};

export default PremiumTopbar;