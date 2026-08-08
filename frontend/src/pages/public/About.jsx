function About() {
  return (
    <section className="about-page">

      <div className="container">

        {/* Hero */}

        <div className="about-hero">

          <span className="about-badge">
            📚 About SRKIT
          </span>

          <h1 className="about-title">
            Empowering Academic
            <br/>
            <span>Digital Innovation</span>
          </h1>

          <p className="about-description">
            ResultX is a modern platform that makes academic result
            management faster, smarter, and easier for everyone.
          </p>

        </div>

        {/* Cards */}

        <div className="about-grid">

          <div className="about-card">

            <div className="about-icon">
              🎓
            </div>

            <h3>Students</h3>

            <p>
              View results, CGPA, marksheets,
              and academic progress.
            </p>

          </div>

          <div className="about-card">

            <div className="about-icon">
              👨‍🏫
            </div>

            <h3>HODs</h3>

            <p>
              Manage students, approve
              records, and track performance.
            </p>

          </div>

          <div className="about-card">

            <div className="about-icon">
              🏢
            </div>

            <h3>Exam Cell</h3>

            <p>
              Upload marks, publish results,
              and manage examinations.
            </p>

          </div>

          <div className="about-card">

            <div className="about-icon">
              ⚙️
            </div>

            <h3>Administration</h3>

            <p>
              Control departments, users,
              permissions, and settings.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;