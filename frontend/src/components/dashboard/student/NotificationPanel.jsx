function NotificationPanel({ notifications = [] }) {
  return (
    <section className="dashboard-card notification-card">
      <div className="card-header">
        <h2>🔔 Notifications</h2>

        <button
          className="dashboard-btn dashboard-btn-outline"
          disabled={notifications.length === 0}
        >
          View All
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔔</div>

          <h3>No Notifications</h3>

          <p>
            Notifications from the HOD and Exam Cell will appear here.
          </p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification-item"
            >
              <h4>{notification.title}</h4>

              <p>{notification.message}</p>

              <small>{notification.date}</small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default NotificationPanel;