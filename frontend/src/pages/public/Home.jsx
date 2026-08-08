import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <section className="hero">

        {/* Transparent Overlay */}

        <div className="hero-overlay">

          <div className="hero-container">

            <span className="hero-badge">
              SRK Institute of Technology • Official Portal
            </span>

            <h1>
              Welcome to <span>ResultX</span>
            </h1>

            <p>
              A unified platform for academic excellence. ResultX enables students
              to access results instantly while providing faculty, Heads of
              Departments, and the Examination Cell with powerful tools to manage
              academic records efficiently, securely, and effortlessly.
            </p>

            <div className="hero-buttons">

              <Link
                to="/login"
                className="hero-btn"
              >
                🔐 Login to ResultX →
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;