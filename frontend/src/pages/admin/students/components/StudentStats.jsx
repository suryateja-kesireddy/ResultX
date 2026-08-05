import { useEffect, useState } from "react";

import {
  Users,
  GraduationCap,
  Laptop,
  Cpu,
  Brain,
  Database,
} from "lucide-react";

import StudentStatCard from "./StudentStatCard";

import { getStudentStats } from "../../../../services/student/studentService";

export default function StudentStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStudentStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load student statistics:", error);
    }
  };

  if (!stats) {
    return null;
  }

  const getIcon = (code) => {
    switch (code) {
      case "MCA":
        return <GraduationCap size={28} />;

      case "CSE":
        return <Laptop size={28} />;

      case "ECE":
        return <Cpu size={28} />;

      case "AIML":
        return <Brain size={28} />;

      case "IT":
        return <Database size={28} />;

      default:
        return <Users size={28} />;
    }
  };

  const getColor = (code) => {
    switch (code) {
      case "MCA":
        return "#7c3aed";

      case "CSE":
        return "#16a34a";

      case "ECE":
        return "#ea580c";

      case "AIML":
        return "#4f46e5";

      case "IT":
        return "#0891b2";

      default:
        return "#2563eb";
    }
  };

  const cards = [
    {
      title: "Total",
      count: stats.total,
      subtitle: "Students",
      color: "#2563eb",
      icon: <Users size={28} />,
    },

    ...stats.departments.map((department) => ({
      title: department.code,
      count: department.count,
      subtitle: "Students",
      color: getColor(department.code),
      icon: getIcon(department.code),
    })),
  ];

  return (
    <div className="student-stats-grid">
      {cards.map((card) => (
        <StudentStatCard
          key={card.title}
          title={card.title}
          count={card.count}
          subtitle={card.subtitle}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
}