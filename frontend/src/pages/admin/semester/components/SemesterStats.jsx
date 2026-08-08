import {
  CalendarDays,
  CircleDashed,
  Circle,
  GraduationCap,
} from "lucide-react";

export default function SemesterStats({
  semesters,
}) {

  const totalSemesters = semesters.length;

  const oddSemesters = semesters.filter(
    (semester) => semester.type === "ODD"
  ).length;

  const evenSemesters = semesters.filter(
    (semester) => semester.type === "EVEN"
  ).length;

  const currentAcademicYearSemesters = semesters.filter(
    (semester) => semester.academicYear?.isCurrent
  ).length;

  const stats = [
    {
      title: "Total Semesters",
      value: totalSemesters,
      icon: CalendarDays,
      className: "semester-blue",
    },
    {
      title: "Odd Semesters",
      value: oddSemesters,
      icon: CircleDashed,
      className: "semester-orange",
    },
    {
      title: "Even Semesters",
      value: evenSemesters,
      icon: Circle,
      className: "semester-green",
    },
    {
      title: "Current Academic Year",
      value: currentAcademicYearSemesters,
      icon: GraduationCap,
      className: "semester-purple",
    },
  ];

  return (

    <div className="semester-stats-grid">

      {stats.map((stat) => {

        const Icon = stat.icon;

        return (

          <div
            key={stat.title}
            className="semester-stat-card"
          >

            <div
              className={`semester-stat-icon ${stat.className}`}
            >
              <Icon size={30} />
            </div>

            <div className="semester-stat-content">

              <h2>{stat.value}</h2>

              <p>{stat.title}</p>

            </div>

          </div>

        );

      })}

    </div>

  );

}