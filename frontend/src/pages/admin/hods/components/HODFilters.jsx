export default function HODFilters({
    search,
    setSearch,
}) {
    return (
        <div className="hod-filters">

            {/* ================= SEARCH ================= */}

            <div className="hod-search">

                <input
                    type="text"
                    placeholder="Search Employee ID or Name..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>


            {/* ================= RESET ================= */}

            <button
                type="button"
                className="hod-reset-btn"
                onClick={() => setSearch("")}
            >
                Reset
            </button>

        </div>
    );
}