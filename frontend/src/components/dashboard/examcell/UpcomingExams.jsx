function UpcomingExams() {
  return (
    <section className="examcell-card">

      <h2 className="examcell-card-title">
        Upcoming Exams
      </h2>

      <div className="examcell-exam">

        <div>
          <h4>Mid-I Examination</h4>
          <p>MCA I Semester</p>
        </div>

        <div className="examcell-date-badge">
          10 Aug 2026
        </div>

      </div>

      <div className="examcell-exam">

        <div>
          <h4>Mid-II Examination</h4>
          <p>MCA III Semester</p>
        </div>

        <div className="examcell-date-badge">
          18 Aug 2026
        </div>

      </div>

      <div className="examcell-exam">

        <div>
          <h4>Internal Examination</h4>
          <p>MCA V Semester</p>
        </div>

        <div className="examcell-date-badge">
          24 Aug 2026
        </div>

      </div>

    </section>
  );
}

export default UpcomingExams;