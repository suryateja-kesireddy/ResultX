import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="container hero-content">

        <span className="hero-badge">
          🚀 College Result Management System
        </span>

        <h1>
          Welcome to <span>ResultX</span>
        </h1>

        <p>
          A secure, modern, and responsive platform for students,
          HODs, Exam Cell staff, and Administrators to manage
          academic results with ease.
        </p>

        <div className="hero-buttons">
          <Link to="/login" className="hero-btn">
            🔐 Login to ResultX →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Home;