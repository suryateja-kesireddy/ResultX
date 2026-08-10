import StatCard from "./StatCard";

function StatsGrid({ stats }) {

    return (
        <div className="stats-grid">

            {/* ================= STUDENTS ================= */}

            <StatCard
                title="Total Students"
                value={stats?.totalStudents ?? 0}
                color="#2563eb"
            />

            {/* ================= FACULTY ================= */}

            <StatCard
                title="Total Faculty"
                value={stats?.totalFaculty ?? 0}
                color="#16a34a"
            />

            {/* ================= SUBJECTS ================= */}

            <StatCard
                title="Total Subjects"
                value={stats?.totalSubjects ?? 0}
                color="#f59e0b"
            />

        </div>
    );
}

export default StatsGrid;