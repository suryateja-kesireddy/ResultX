import StatCard from "./StatCard";

function StatsGrid() {
  return (
    <div className="examcell-stats-grid">

      <StatCard
        title="Total Students"
        value="1250"
        icon="👨‍🎓"
      />

      <StatCard
        title="Total Subjects"
        value="48"
        icon="📚"
      />

      <StatCard
        title="Active Exams"
        value="12"
        icon="📝"
      />

      <StatCard
        title="Results Published"
        value="28"
        icon="📄"
      />

    </div>
  );
}

export default StatsGrid;