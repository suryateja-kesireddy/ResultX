const PremiumTopbar = ({ onMenuClick }) => {
  return (
    <header className="premium-topbar">

      {/* ================= LEFT ================= */}
      <div className="rx-topbar-brand">

        

        <div className="rx-topbar-brand-text">
          <h2>ResultX</h2>
          
        </div>

      </div>


      {/* ================= RIGHT ================= */}
      <button
        type="button"
        className="mobile-menu-btn"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </header>
  );
};

export default PremiumTopbar;