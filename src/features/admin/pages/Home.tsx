import "./Home.css";

const AdminHome: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-3">
        <div>
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">
            Overview of quiz activity and engagement.
          </p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm">Export</button>
          <button className="btn btn-primary btn-sm">Create Quiz</button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card metric-card">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between">
                <div>
                  <p className="metric-card__label mb-1">Total Quizzes</p>
                  <h2 className="metric-card__value mb-2">42</h2>
                  <span className="text-success small">+6 this month</span>
                </div>
                <span className="metric-icon metric-icon--primary">QZ</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card metric-card">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between">
                <div>
                  <p className="metric-card__label mb-1">Responses Submitted</p>
                  <h2 className="metric-card__value mb-2">1,284</h2>
                  <span className="text-success small">+12% vs last week</span>
                </div>
                <span className="metric-icon metric-icon--accent">RS</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card metric-card">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between">
                <div>
                  <p className="metric-card__label mb-1">Active Participants</p>
                  <h2 className="metric-card__value mb-2">308</h2>
                  <span className="text-muted small">Steady engagement</span>
                </div>
                <span className="metric-icon metric-icon--neutral">AP</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card metric-card">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between">
                <div>
                  <p className="metric-card__label mb-1">
                    Avg. Completion Time
                  </p>
                  <h2 className="metric-card__value mb-2">5m 24s</h2>
                  <span className="text-success small">-18s improvement</span>
                </div>
                <span className="metric-icon metric-icon--warning">TM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-12 col-xl-8">
          <div className="card h-100">
            <div className="card-header">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                <div>
                  <h5 className="card-title mb-0">Responses over time</h5>
                  <div className="card-subtitle text-muted">
                    Weekly submissions and completion rate.
                  </div>
                </div>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-secondary">7d</button>
                  <button className="btn btn-outline-secondary">30d</button>
                  <button className="btn btn-outline-secondary active">
                    90d
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-placeholder">
                <div className="chart-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <svg
                  className="chart-svg"
                  viewBox="0 0 600 200"
                  preserveAspectRatio="none"
                >
                  <polyline
                    className="chart-line chart-line--primary"
                    points="0,140 60,110 120,120 180,80 240,90 300,60 360,75 420,40 480,70 540,55 600,60"
                  />
                  <polyline
                    className="chart-line chart-line--secondary"
                    points="0,160 60,150 120,165 180,120 240,130 300,100 360,115 420,90 480,110 540,95 600,110"
                  />
                </svg>
                <div className="chart-legend">
                  <span>
                    <span className="legend-dot legend-dot--primary" />
                    Responses
                  </span>
                  <span>
                    <span className="legend-dot legend-dot--secondary" />
                    Completion rate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Recent activity</h5>
              <div className="card-subtitle text-muted">
                Latest response submissions.
              </div>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush activity-list">
                <div className="list-group-item">
                  <div>
                    <div className="fw-semibold">Java Basics</div>
                    <small className="text-muted">18 responses</small>
                  </div>
                  <span className="badge bg-success">2 min ago</span>
                </div>
                <div className="list-group-item">
                  <div>
                    <div className="fw-semibold">React Hooks</div>
                    <small className="text-muted">11 responses</small>
                  </div>
                  <span className="badge bg-info text-dark">18 min ago</span>
                </div>
                <div className="list-group-item">
                  <div>
                    <div className="fw-semibold">SQL Mastery</div>
                    <small className="text-muted">27 responses</small>
                  </div>
                  <span className="badge bg-secondary">1 hr ago</span>
                </div>
                <div className="list-group-item">
                  <div>
                    <div className="fw-semibold">UX Essentials</div>
                    <small className="text-muted">5 responses</small>
                  </div>
                  <span className="badge bg-light text-dark">3 hr ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-2">
              <div>
                <h5 className="card-title mb-0">Top quizzes</h5>
                <div className="card-subtitle text-muted">
                  Most active quizzes this week.
                </div>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                View all
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Quiz</th>
                    <th>Status</th>
                    <th>Responses</th>
                    <th>Completion</th>
                    <th className="text-end">Last activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="fw-semibold">Frontend Fundamentals</div>
                      <small className="text-muted">Created 2 days ago</small>
                    </td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                    <td>248</td>
                    <td>
                      <div className="progress progress-sm">
                        <div className="progress-bar bg-primary" style={{ width: "72%" }} />
                      </div>
                    </td>
                    <td className="text-end text-muted">12 min ago</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="fw-semibold">Node Essentials</div>
                      <small className="text-muted">Created 1 week ago</small>
                    </td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        Draft
                      </span>
                    </td>
                    <td>132</td>
                    <td>
                      <div className="progress progress-sm">
                        <div className="progress-bar bg-info" style={{ width: "48%" }} />
                      </div>
                    </td>
                    <td className="text-end text-muted">3 hr ago</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="fw-semibold">Design Systems</div>
                      <small className="text-muted">Created 3 weeks ago</small>
                    </td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                    <td>96</td>
                    <td>
                      <div className="progress progress-sm">
                        <div className="progress-bar bg-primary" style={{ width: "64%" }} />
                      </div>
                    </td>
                    <td className="text-end text-muted">Yesterday</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="fw-semibold">SQL Sprint</div>
                      <small className="text-muted">Created 1 month ago</small>
                    </td>
                    <td>
                      <span className="badge bg-danger">Paused</span>
                    </td>
                    <td>54</td>
                    <td>
                      <div className="progress progress-sm">
                        <div className="progress-bar bg-secondary" style={{ width: "32%" }} />
                      </div>
                    </td>
                    <td className="text-end text-muted">2 days ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
