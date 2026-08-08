import { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  Laptop,
  Cpu,
  Brain,
  Database,
} from "lucide-react";

import { getFacultyStats } from "../../../../services/faculty/facultyService";
import FacultyCard from "./FacultyCard";

export default function FacultyStats({
  selectedDepartment,
  onDepartmentChange,
}) {
  const [stats, setStats] = useState({
    totalFaculty: 0,
    departments: [],
  });

  useEffect(() => {
    loadFacultyStats();
  }, []);

  const loadFacultyStats = async () => {
    try {
      const data = await getFacultyStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load faculty statistics", error);
    }
  };

  const iconMap = {
    MCA: <GraduationCap size={34} />,
    CSE: <Laptop size={34} />,
    ECE: <Cpu size={34} />,
    AIML: <Brain size={34} />,
    IT: <Database size={34} />,
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
    <div className="faculty-stats-grid">

      <FacultyCard
        title="Total Faculty"
        count={stats.totalFaculty}
        icon={<Users size={34} />}
        color={colorMap.TOTAL}
        active={selectedDepartment === null}
        onClick={() => onDepartmentChange(null)}
      />

      {stats.departments.map((department) => (
        <FacultyCard
          key={department.id}
          title={department.code}
          count={department.facultyCount}
          icon={
            iconMap[department.code] || (
              <GraduationCap size={34} />
            )
          }
          color={
            colorMap[department.code] || "#2563eb"
          }
          active={selectedDepartment?.id === department.id}
          onClick={() => onDepartmentChange(department)}
        />
      ))}

    </div>
  );
}