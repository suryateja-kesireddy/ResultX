export default function StudentFilters({
  filters,
  setFilters,
}) {
  const handleReset = () => {
    setFilters({
      search: "",
      department: "",
      semester: "",
      status: "",
    });
  };

  return (
    <div className="student-filters">

      {/* Search */}
      <div className="student-search">

        <input
          type="text"
          placeholder="Search by Name or Hall Ticket..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
            }))
          }
        />

      </div>

      {/* Semester */}

      <select
        value={filters.semester}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            semester: e.target.value,
          }))
        }
      >
        <option value="">All Semesters</option>
        <option value="1">Semester 1</option>
        <option value="2">Semester 2</option>
        <option value="3">Semester 3</option>
        <option value="4">Semester 4</option>
      </select>

      {/* Status */}

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            status: e.target.value,
          }))
        }
      >
        <option value="">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>

      {/* Reset */}

      <button
        className="reset-btn"
        onClick={handleReset}
      >
        Reset
      </button>

    </div>
  );
}