function RecentResults({ results = [] }) {
  return (
    <section className="dashboard-card results-card">
      <div className="card-header">
        <h2>📄 Recent Results</h2>

        <button
          className="dashboard-btn dashboard-btn-outline"
          disabled={results.length === 0}
        >
          View All
        </button>
      </div>

      <table className="results-table">
        <thead>
          <tr>
            <th>Semester</th>
            <th>SGPA</th>
            <th>Status</th>
            <th>Published Date</th>
          </tr>
        </thead>

        <tbody>
          {results.length === 0 ? (
            <tr>
              <td colSpan="4">
                <div className="empty-state">
                  <div className="empty-icon">📄</div>

                  <h3>No Results Published Yet</h3>

                  <p>
                    Your semester results will appear here once they are officially published by the Exam Cell.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            results.map((result) => (
              <tr key={result.id}>
                <td>{result.semester}</td>
                <td>{result.sgpa}</td>
                <td>{result.status}</td>
                <td>{result.publishedDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
export default RecentResults;