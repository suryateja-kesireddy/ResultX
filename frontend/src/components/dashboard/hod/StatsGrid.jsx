import StatCard from "./StatCard";

function StatsGrid({ stats }) {
  return (
    <div className="hod-stats-grid">

      <StatCard
        title="Total Students"
        value={stats?.totalStudents ?? 0}
        color="#2563eb"
      />

      <StatCard
        title="Faculty"
        value={stats?.totalFaculty ?? 0}
        color="#16a34a"
      />

      <StatCard
        title="Subjects"
        value={stats?.totalSubjects ?? 0}
        color="#f59e0b"
      />

      <StatCard
        title="Pass Percentage"
        value={`${stats?.passPercentage ?? 0}%`}
        color="#7c3aed"
      />

    </div>
  );
}

export default StatsGrid;