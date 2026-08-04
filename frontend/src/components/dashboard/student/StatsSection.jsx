import StatCard from "./StatCard";
import useAuth from "../../../hooks/auth/useAuth";

function StatsSection() {
  const { user } = useAuth();

  return (
    <section className="stats-section">
      <div className="stats-grid">
        <StatCard
    title="Current CGPA"
    value={user?.cgpa}
    subtitle="Overall Performance"
    icon="🎓"
/>

<StatCard
    title="Attendance"
    value={`${user?.attendance}%`}
    subtitle="Current Semester"
    icon="📅"
/>

<StatCard
    title="Completed Subjects"
    value={user?.completedSubjects}
    subtitle="Successfully Passed"
    icon="📚"
/>

<StatCard
    title="Backlogs"
    value={user?.backlogs}
    subtitle="Current Status"
    icon="⚠️"
/>
      </div>
    </section>
  );
}

export default StatsSection;