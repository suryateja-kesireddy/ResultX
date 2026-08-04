import useAuth from "../../../hooks/auth/useAuth";

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
    <div className="examcell-header">

      <div>

        <h1>
          Welcome Back, <strong>{user?.name || "Exam Cell"}</strong>
        </h1>

        <p>
          Manage examinations, results and academic activities.
        </p>

      </div>

      <div className="examcell-date">
        {formattedDate}
      </div>

    </div>
  );
}

export default DashboardHeader;