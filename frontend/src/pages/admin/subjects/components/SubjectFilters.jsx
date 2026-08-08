export default function SubjectFilters({
    search,
    setSearch,
    semester,
    setSemester,
}) {
    return (
        <div className="subject-filters">

            {/* Search */}
            <div className="subject-search">
                <input
                    type="text"
                    placeholder="Search Subject Name or Code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Semester */}
            <select
                className="subject-filter-select"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
            >
                <option value="">
                    All Semesters
                </option>

                <option value="1">
                    Semester 1
                </option>

                <option value="2">
                    Semester 2
                </option>

                <option value="3">
                    Semester 3
                </option>

                <option value="4">
                    Semester 4
                </option>

                <option value="5">
                    Semester 5
                </option>

                <option value="6">
                    Semester 6
                </option>

                <option value="7">
                    Semester 7
                </option>

                <option value="8">
                    Semester 8
                </option>
            </select>

            {/* Reset */}
            <button
                type="button"
                className="subject-reset-btn"
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