function ProfileCard({
  name,
  hallTicket,
  department,
  semester,
  section,
  profileImage,
}) {
  return (
    <section className="dashboard-card profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          {profileImage ? (
            <img src={profileImage} alt={name} />
          ) : (
            <span>👤</span>
          )}
        </div>

        <div className="profile-info">
          <h2>{name || "Student Name"}</h2>

          <p>
            {department || "--"} • Semester {semester || "--"} • Section{" "}
            {section || "--"}
          </p>
        </div>
      </div>

      <div className="profile-details">

        <div className="profile-item">
          <span>Hall Ticket</span>
          <strong>{hallTicket || "--"}</strong>
        </div>

        <div className="profile-item">
          <span>Department</span>
          <strong>{department || "--"}</strong>
        </div>

        <div className="profile-item">
          <span>Semester</span>
          <strong>{semester || "--"}</strong>
        </div>

        <div className="profile-item">
          <span>Section</span>
          <strong>{section || "--"}</strong>
        </div>

      </div>
    </section>
  );
}

export default ProfileCard;