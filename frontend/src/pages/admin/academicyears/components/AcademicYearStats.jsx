import {
  CalendarDays,
  CheckCircle,
  Clock3,
} from "lucide-react";

export default function AcademicYearStats({
  academicYears,
}) {

  const totalAcademicYears = academicYears.length;

  const currentAcademicYear = academicYears.filter(
    (academicYear) => academicYear.isCurrent
  ).length;

  const inactiveAcademicYears =
    totalAcademicYears - currentAcademicYear;

  const stats = [
    {
      title: "Total Academic Years",
      value: totalAcademicYears,
      icon: CalendarDays,
      className: "academic-blue",
    },
    {
      title: "Current Academic Year",
      value: currentAcademicYear,
      icon: CheckCircle,
      className: "academic-green",
    },
    {
      title: "Inactive Academic Years",
      value: inactiveAcademicYears,
      icon: Clock3,
      className: "academic-red",
    },
  ];

  return (

    <div className="academic-stats-grid">

      {stats.map((stat) => {

        const Icon = stat.icon;

        return (

          <div
            key={stat.title}
            className="academic-stat-card"
          >

            <div
              className={`academic-stat-icon ${stat.className}`}
            >
              <Icon size={30} />
            </div>

            <div className="academic-stat-content">

              <h2>{stat.value}</h2>

              <p>{stat.title}</p>

            </div>

          </div>

        );

      })}

    </div>

  );

}