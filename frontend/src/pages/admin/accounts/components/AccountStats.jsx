import { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  UserCog,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

import { getAccountStats } from "../../../../services/admin/accountService";

export default function AccountStats() {
  const [stats, setStats] = useState({
    totalAccounts: 0,
    students: 0,
    hods: 0,
    examCells: 0,
    admins: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getAccountStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load account statistics:", error);
    }
  };

  const statCards = [
    {
      title: "Total Accounts",
      value: stats.totalAccounts,
      icon: Users,
      color: "#2563eb",
    },
    {
      title: "Students",
      value: stats.students,
      icon: GraduationCap,
      color: "#10b981",
    },
    {
      title: "HOD",
      value: stats.hods,
      icon: UserCog,
      color: "#f59e0b",
    },
    {
      title: "Exam Cell",
      value: stats.examCells,
      icon: ClipboardList,
      color: "#8b5cf6",
    },
    {
      title: "Admin",
      value: stats.admins,
      icon: ShieldCheck,
      color: "#ef4444",
    },
  ];

  return (
    <div className="account-stats">
      {statCards.map((item) => {
        const Icon = item.icon;

        return (
          <div className="account-stat-card" key={item.title}>
            <div
              className="account-stat-icon"
              style={{
                background: `${item.color}15`,
                color: item.color,
              }}
            >
              <Icon size={26} />
            </div>

            <div className="account-stat-content">
              <span>{item.title}</span>
              <h2>{item.value}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}