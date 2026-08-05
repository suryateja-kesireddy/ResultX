import { useEffect, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Laptop,
  Cpu,
  Brain,
  Database,
} from "lucide-react";

import { getSubjectStats } from "../../../../services/subject/subjectService";
import SubjectStatCard from "./SubjectStatCard";

export default function SubjectStats({
  selectedDepartment,
  onDepartmentChange,
}) {
  const [stats, setStats] = useState({
    totalSubjects: 0,
    departments: [],
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getSubjectStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const iconMap = {
    MCA: <GraduationCap size={28} />,
    CSE: <Laptop size={28} />,
    ECE: <Cpu size={28} />,
    AIML: <Brain size={28} />,
    IT: <Database size={28} />,
  };

  const colorMap = {
    TOTAL: "#2563eb",
    MCA: "#7c3aed",
    CSE: "#16a34a",
    ECE: "#ea580c",
    AIML: "#4f46e5",
    IT: "#0891b2",
  };

  return (
    <div className="student-stats-grid">

      <SubjectStatCard
        title="Total"
        count={stats.totalSubjects}
        subtitle="Subjects"
        icon={<BookOpen size={28} />}
        color={colorMap.TOTAL}
        active={selectedDepartment === "ALL"}
        onClick={() => onDepartmentChange("ALL")}
      />

      {stats.departments.map((department) => (
        <SubjectStatCard
          key={department.id}
          title={department.code}
          count={department.count}
          subtitle="Subjects"
          icon={
            iconMap[department.code] || (
              <BookOpen size={28} />
            )
          }
          color={
            colorMap[department.code] || "#2563eb"
          }
          active={selectedDepartment === department.code}
          onClick={() =>
            onDepartmentChange(department.code)
          }
        />
      ))}
    </div>
  );
}