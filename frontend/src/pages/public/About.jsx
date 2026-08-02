function About() {
  return (
    <section className="about-page">
      <div className="container">

        <div className="about-hero">
          <span className="about-badge">
            📚 About ResultX
          </span>

          <h1>
            Modern College Result
            <span> Management Platform</span>
          </h1>

          <p>
            ResultX is a secure, fast, and modern web application designed to
            simplify the management of academic results for Students, HODs,
            Exam Cell staff, and Administrators. Our goal is to replace
            traditional result management with a transparent, efficient, and
            user-friendly digital experience.
          </p>
        </div>

        <div className="about-grid">

          <div className="about-card">
            <div className="about-icon">🎓</div>

            <h3>For Students</h3>

            <p>
              View semester results, download mark sheets,
              track CGPA, and monitor academic performance
              from a single dashboard.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">👨‍🏫</div>

            <h3>For HODs</h3>

            <p>
              Manage department results, verify student
              records, approve submissions, and monitor
              departmental performance.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🏢</div>

            <h3>Exam Cell</h3>

            <p>
              Publish semester results, manage examinations,
              and maintain complete academic records securely.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">⚙️</div>

            <h3>Administration</h3>

            <p>
              Manage users, departments, security settings,
              and maintain the complete ResultX ecosystem.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;