import useAuth from "../../../hooks/useAuth";

function DashboardHeader() {
  const { user } = useAuth();

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
        <h1>👋 Welcome Back, {user?.name || "Student"}</h1>

        <p>
          {user?.department} • Semester {user?.semester} • Section {user?.section}
        </p>
      </div>

      <div className="dashboard-date">
        {formattedDate}
      </div>
    </div>
  );
}

export default DashboardHeader;