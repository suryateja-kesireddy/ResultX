function PerformanceChart({ performanceData = [] }) {
  return (
    <section className="dashboard-card performance-card">
      <div className="card-header">
        <h2>📈 Academic Performance</h2>

        <button
          className="dashboard-btn dashboard-btn-outline"
          disabled={performanceData.length === 0}
        >
          View Analytics
        </button>
      </div>

      {performanceData.length === 0 ? (
        <div className="chart-placeholder">
          <div className="empty-icon">📊</div>

          <h3>No Performance Data</h3>

          <p>
            Your semester performance graph will appear here.
          </p>
        </div>
      ) : (
        <div className="chart-container">
          {/* Chart Component will be added after backend integration */}
        </div>
      )}
    </section>
  );
}

export default PerformanceChart;