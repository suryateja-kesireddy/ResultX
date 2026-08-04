import { useNavigate } from "react-router-dom";
import useExamCell from "../../../hooks/examcell/useExamCell";

function ExamCellTopbar() {
  const navigate = useNavigate();

  const { examCell } = useExamCell();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/examcell/login");
  };

  return (
    <header className="examcell-topbar">

      <input
        type="text"
        placeholder="Search..."
        className="examcell-search"
      />

      <div className="examcell-topbar-right">

        <div className="examcell-user">

          <h4>
            {examCell?.user?.name || "Exam Cell"}
          </h4>

          <p>
            {examCell?.user?.role || "EXAM_CELL"}
          </p>

        </div>

        <button
          className="examcell-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default ExamCellTopbar;