import { Search, RotateCcw } from "lucide-react";

export default function AccountFilters() {
  return (
    <div className="account-filters">

      <div className="filter-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search by name, username or email..."
        />
      </div>

      <select>
        <option>All Roles</option>
        <option>Student</option>
        <option>HOD</option>
        <option>Exam Cell</option>
        <option>Admin</option>
      </select>

      <select>
        <option>All Departments</option>
        <option>CSE</option>
        <option>ECE</option>
        <option>AIML</option>
        <option>IT</option>
        <option>MCA</option>
      </select>

      <select>
        <option>All Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <button className="reset-btn">
        <RotateCcw size={16} />
        Reset
      </button>

    </div>
  );
}