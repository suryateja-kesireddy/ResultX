function RecentActivity() {
  return (
    <section className="examcell-card">

      <h2 className="examcell-card-title">
        Recent Activity
      </h2>

      <div className="activity-item">

        <div className="activity-icon">
          📝
        </div>

        <div className="activity-content">
          <h4>Mid-I Examination Created</h4>
          <p>10 Minutes Ago</p>
        </div>

      </div>

      <div className="activity-item">

        <div className="activity-icon">
          📄
        </div>

        <div className="activity-content">
          <h4>MCA I Results Published</h4>
          <p>1 Hour Ago</p>
        </div>

      </div>

      <div className="activity-item">

        <div className="activity-icon">
          📚
        </div>

        <div className="activity-content">
          <h4>Java Subject Assigned</h4>
          <p>Yesterday</p>
        </div>

      </div>

      <div className="activity-item">

        <div className="activity-icon">
          ✏️
        </div>

        <div className="activity-content">
          <h4>Internal Marks Updated</h4>
          <p>2 Days Ago</p>
        </div>

      </div>

    </section>
  );
}

export default RecentActivity;