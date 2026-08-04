function RecentResults() {
  return (
    <section className="examcell-card">

      <h2 className="examcell-card-title">
        Recent Results
      </h2>

      <div className="examcell-result">

        <div>
          <h4>MCA I Mid-I Examination</h4>
          <p>Result Published</p>
        </div>

        <span className="result-status published">
          Published
        </span>

      </div>

      <div className="examcell-result">

        <div>
          <h4>MCA III Mid-II Examination</h4>
          <p>Result Published</p>
        </div>

        <span className="result-status published">
          Published
        </span>

      </div>

      <div className="examcell-result">

        <div>
          <h4>MCA V Internal Examination</h4>
          <p>Result Processing</p>
        </div>

        <span className="result-status pending">
          Pending
        </span>

      </div>

    </section>
  );
}

export default RecentResults;