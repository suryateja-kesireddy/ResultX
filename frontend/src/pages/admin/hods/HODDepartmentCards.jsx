const departments = [
  {
    name: "All HODs",
    count: 12,
    icon: "👨‍🏫",
  },
  {
    name: "MCA",
    count: 2,
    icon: "💻",
  },
  {
    name: "MBA",
    count: 3,
    icon: "💼",
  },
  {
    name: "BCA",
    count: 2,
    icon: "🖥️",
  },
  {
    name: "B.Tech",
    count: 4,
    icon: "⚙️",
  },
  {
    name: "M.Tech",
    count: 1,
    icon: "🧠",
  },
];

const HODDepartmentCards = () => {
  return (
    <div className="rx-hod-cards">

      {departments.map((department) => (

        <div
          key={department.name}
          className="rx-hod-card"
        >

          <div className="rx-hod-card-icon">
            {department.icon}
          </div>

          <div className="rx-hod-card-content">

            <h3>{department.name}</h3>

            <p>{department.count} Faculty</p>

          </div>

        </div>

      ))}

    </div>
  );
};

export default HODDepartmentCards;