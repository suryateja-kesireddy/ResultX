import {
  GraduationCap,
  Users,
  FileSpreadsheet,
  BookOpen,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = () => {
  return (
    <div className="rx-stats-grid">

      <StatCard
        icon={GraduationCap}
        title="Students"
        value="1,245"
        subtitle="+12 New Students"
        color="#2563EB"
      />

      <StatCard
        icon={Users}
        title="Faculty"
        value="42"
        subtitle="Active Members"
        color="#10B981"
      />

      <StatCard
        icon={FileSpreadsheet}
        title="Results"
        value="98%"
        subtitle="Published"
        color="#F59E0B"
      />

      <StatCard
        icon={BookOpen}
        title="Courses"
        value="18"
        subtitle="Running Courses"
        color="#8B5CF6"
      />

    </div>
  );
};

export default StatsGrid;