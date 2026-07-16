import React from "react";

function Header({ prediction }) {
  return (
    <div className="container-fluid py-5 bg-light">

      <div className="container">

        <div className="text-center mb-5">
          <h1 className="display-3 fw-bold text-primary">
            🚦 Smart Traffic Prediction System
          </h1>

          <p className="lead text-secondary">
            AI Powered Traffic Prediction using Machine Learning
          </p>
        </div>

        <div className="row g-4">

          <div className="col-lg-3 col-md-6">
            <div className="card shadow border-0 rounded-4 h-100">
              <div className="card-body text-center">

                <h1>🚦</h1>

                <h5>Traffic Status</h5>

                <h3 className="text-danger">
                  {prediction
                    ? prediction["Traffic Prediction"]
                    : "--"}
                </h3>

              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow border-0 rounded-4 h-100">
              <div className="card-body text-center">

                <h1>📊</h1>

                <h5>Confidence</h5>

                <h3 className="text-success">
                  {prediction
                    ? prediction["Confidence"]
                    : "--"}
                </h3>

              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow border-0 rounded-4 h-100">
              <div className="card-body text-center">

                <h1>🚗</h1>

                <h5>Travel Time</h5>

                <h3 className="text-warning">
                  {prediction
                    ? prediction["Estimated Travel Time"]
                    : "--"}
                </h3>

              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow border-0 rounded-4 h-100">
              <div className="card-body text-center">

                <h1>🛣️</h1>

                <h5>Best Route</h5>

                <h3 className="text-primary">
                  {prediction
                    ? prediction["Suggested Route"]
                    : "--"}
                </h3>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Header;