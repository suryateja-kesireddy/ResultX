import HODDepartmentCards from "./HODDepartmentCards";
import HODSearch from "./HODSearch";
import HODTable from "./HODTable";

const HODs = () => {
  return (
    <div className="rx-hod-page">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="rx-page-header">
        <h2>HOD Management</h2>
        <p>Manage Head of Departments</p>
      </div>

      {/* ==========================================
          DEPARTMENT CARDS
      ========================================== */}

      <HODDepartmentCards />

      {/* ==========================================
          SEARCH
      ========================================== */}

      <HODSearch />

      {/* ==========================================
          TABLE
      ========================================== */}

      <HODTable />

    </div>
  );
};

export default HODs;