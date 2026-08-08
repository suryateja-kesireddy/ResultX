import { Search, RotateCcw } from "lucide-react";

export default function SemesterFilters({
  semesters,
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
      type: "",
      academicYear: "",
    });

  };

  const academicYears = [
    ...new Set(
      semesters.map(
        (semester) => semester.academicYear?.year
      )
    ),
  ];

  return (

    <div className="semester-filters">

      {/* Search */}

      <div className="semester-search">

        <Search
          size={18}
          className="semester-search-icon"
        />

        <input
          type="text"
          name="search"
          placeholder="Search Semester..."
          value={filters.search}
          onChange={handleChange}
        />

      </div>

      {/* Type */}

      <select
        name="type"
        value={filters.type}
        onChange={handleChange}
      >

        <option value="">
          All Types
        </option>

        <option value="ODD">
          ODD
        </option>

        <option value="EVEN">
          EVEN
        </option>

      </select>

      {/* Academic Year */}

      <select
        name="academicYear"
        value={filters.academicYear}
        onChange={handleChange}
      >

        <option value="">
          All Academic Years
        </option>

        {academicYears.map((year) => (

          <option
            key={year}
            value={year}
          >
            {year}
          </option>

        ))}

      </select>

      {/* Reset */}

      <button
        type="button"
        className="semester-reset-btn"
        onClick={handleReset}
      >

        <RotateCcw size={18} />

        Reset

      </button>

    </div>

  );

}