import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  Building2,
  ShieldCheck,
} from "lucide-react";

function LoginSelection() {
  const portals = [
    {
      title: "Student Portal",
      description: "View results, marksheets and academic progress.",
      path: "/student/login",
      icon: <GraduationCap size={42} />,
    },
    {
      title: "HOD Portal",
      description: "Manage department results and approvals.",
      path: "/hod/login",
      icon: <Users size={42} />,
    },
    {
      title: "Exam Cell Portal",
      description: "Publish results and manage examinations.",
      path: "/examcell/login",
      icon: <Building2 size={42} />,
    },
    {
      title: "Admin Portal",
      description: "Complete system administration and settings.",
      path: "/admin/login",
      icon: <ShieldCheck size={42} />,
    },
  ];

  return (
    <section className="login-selection">
      <div className="login-selection-container">
       <h1>Choose Your Login Portal</h1>

        <p className="selection-subtitle">
          Select your role to securely access the ResultX dashboard.
        </p>

        <div className="portal-grid">
          {portals.map((portal) => (
            <div
              key={portal.title}
              className="portal-card"
            >
              <div className="portal-icon">
                {portal.icon}
              </div>

              <h2>{portal.title}</h2>

              <p>{portal.description}</p>

              <Link
                to={portal.path}
                className="portal-link"
              >
                Login →
              </Link>

            </div>

          ))}
        </div>


      </div>

    </section>
  );
}

export default LoginSelection;