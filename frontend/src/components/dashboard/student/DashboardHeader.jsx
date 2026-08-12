function DashboardHeader({ name }) {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const hour = today.getHours();

    let greeting = "Good Morning";

    if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17) {
        greeting = "Good Evening";
    }

    return (
        <div className="dashboard-header">

            {/* ==========================================
                LEFT
            ========================================== */}

            <div className="dashboard-header-content">

                <h1>
                    {greeting}, {name || "Student"}{" "}
                    
                </h1>

               
            </div>


            {/* ==========================================
                RIGHT - DATE
            ========================================== */}

            <div className="dashboard-date">

                {formattedDate}

            </div>

        </div>
    );
}

export default DashboardHeader;