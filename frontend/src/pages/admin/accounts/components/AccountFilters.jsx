import { Search, RotateCcw } from "lucide-react";

export default function AccountFilters({
  filters,
  setFilters,
}) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      role: "",
      department: "",
      status: "",
    });
  };

  return (
    <div className="account-filters">

      {/* Search */}
      <div className="filter-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search by name, username or email..."
          value={filters.search}
          onChange={(e) =>
            handleChange("search", e.target.value)
          }
        />
      </div>

      {/* Role */}
      <select
        value={filters.role}
        onChange={(e) =>
          handleChange("role", e.target.value)
        }
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Student</option>
        <option value="HOD">HOD</option>
        <option value="EXAM_CELL">Exam Cell</option>
        <option value="ADMIN">Admin</option>
      </select>

      {/* Department */}
      <select
        value={filters.department}
        onChange={(e) =>
          handleChange("department", e.target.value)
        }
      >
        <option value="">All Departments</option>

        <option value="Master of Computer Applications">
          MCA
        </option>

        <option value="Computer Science Engineering">
          CSE
        </option>

        <option value="Electronics and Communication Engineering">
          ECE
        </option>

        <option value="Artificial Intelligence and Machine Learning">
          AIML
        </option>

        <option value="Information Technology">
          IT
        </option>
      </select>

      {/* Status */}
      <select
        value={filters.status}
        onChange={(e) =>
          handleChange("status", e.target.value)
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
        <RotateCcw size={16} />
        Reset
      </button>

    </div>
  );
}