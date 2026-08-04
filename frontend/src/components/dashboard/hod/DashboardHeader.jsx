import useHod from "../../../hooks/hod/useHod";

function DashboardHeader() {
  const { hod, loading } = useHod();

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="hod-header">

      <div>
        <h1>
          👋 Welcome Back, {hod?.user?.name || "HOD"}
        </h1>

        <p>
          {hod?.department?.name || "--"} Department
        </p>
      </div>

      <div className="hod-date">
        {formattedDate}
      </div>

    </div>
  );
}

export default DashboardHeader;