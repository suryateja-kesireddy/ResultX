export default function SubjectFilters({
  search,
  setSearch,
  semester,
  setSemester,
}) {
  return (
    <div className="student-filters">

      <div className="student-search">
        <input
          type="text"
          placeholder="Search Subject Name or Code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        <option value="">All Semesters</option>
        <option value="1">Semester 1</option>
        <option value="2">Semester 2</option>
        <option value="3">Semester 3</option>
        <option value="4">Semester 4</option>
      </select>

      <button
        className="reset-btn"
        onClick={() => {
          setSearch("");
          setSemester("");
        }}
      >
        Reset
      </button>

    </div>
  );
}