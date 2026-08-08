import { Search, RotateCcw } from "lucide-react";

export default function FacultyFilters({
  search,
  setSearch,
}) {

  const handleReset = () => {
    setSearch("");
  };

  return (
    <div className="faculty-filters">

      <div className="faculty-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search faculty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <button
        className="faculty-reset-btn"
        onClick={handleReset}
      >
        <RotateCcw size={18} />
        Reset
      </button>

    </div>
  );
}