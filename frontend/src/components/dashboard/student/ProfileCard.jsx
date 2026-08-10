function ProfileCard({
    name,
    hallTicket,
    department,
    semester,
    section,
    profileImage,
}) {
    return (
        <section className="profile-card">

            {/* ==========================================
                PROFILE HEADER
            ========================================== */}

            <div className="profile-header">

                <div className="profile-header-left">

                    {/* Avatar */}

                    <div className="profile-avatar">

                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt={name || "Student"}
                            />
                        ) : (
                            <span>👤</span>
                        )}

                    </div>


                    {/* Student Information */}

                    <div className="profile-info">

                        <h2>
                            {name || "Student Name"}
                        </h2>

                        <p>
                            
                            {" • "}
                            {department || "--"}
                            {" • "}
                            Semester {semester || "--"}
                            {" • "}
                            Section {section || "--"}
                        </p>

                    </div>

                </div>


                {/* Profile Label */}

                <div className="profile-label">
                    Student Profile
                </div>

            </div>


            {/* ==========================================
                DIVIDER
            ========================================== */}

            <div className="profile-divider" />


            {/* ==========================================
                DETAILS
            ========================================== */}

            <div className="profile-details">

                {/* Hall Ticket */}

                <div className="profile-item">

                    <span>
                        Hall Ticket
                    </span>

                    <strong>
                        {hallTicket || "--"}
                    </strong>

                </div>


                {/* Department */}

                <div className="profile-item">

                    <span>
                        Department
                    </span>

                    <strong>
                        {department || "--"}
                    </strong>

                </div>


                {/* Semester */}

                <div className="profile-item">

                    <span>
                        Semester
                    </span>

                    <strong>
                        {semester || "--"}
                    </strong>

                </div>


                {/* Section */}

                <div className="profile-item">

                    <span>
                        Section
                    </span>

                    <strong>
                        {section || "--"}
                    </strong>

                </div>

            </div>

        </section>
    );
}

export default ProfileCard;