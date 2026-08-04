function DashboardHeader({
  name,
  department,
  semester,
  section,
}) {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-header">
      <div>
        <h1>
   <strong>Welcome Back,{name}</strong>
</h1>

        <p>
           Semester {semester || "--"} • Section{" "}
          {section || "--"}
        </p>
      </div>

      <div className="dashboard-date">
        {formattedDate}
      </div>
    </div>
  );
}

export default DashboardHeader;