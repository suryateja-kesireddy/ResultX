import { Search, RotateCcw } from "lucide-react";

export default function AcademicYearFilters({
  filters,
  setFilters,
}) {

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      current: "",
    });
  };

  return (

    <div className="academic-year-filters">

      {/* Search */}

      <div className="academic-search">

        <Search size={18} className="academic-search-icon" />

        <input
          type="text"
          name="search"
          placeholder="Search Academic Year..."
          value={filters.search}
          onChange={handleChange}
        />

      </div>

      {/* Status */}

      <select
        name="current"
        value={filters.current}
        onChange={handleChange}
      >

        <option value="">
          All Status
        </option>

        <option value="true">
          Current
        </option>

        <option value="false">
          Inactive
        </option>

      </select>

      {/* Reset */}

      <button
        type="button"
        className="academic-reset-btn"
        onClick={handleReset}
      >
        <RotateCcw size={18} />
        Reset
      </button>

    </div>

  );

}