import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import AIAdvisor from "./AIAdvisor";
import DashboardStats from "./DashboardStats";
import TrafficMap from "./TrafficMap";
import ConfidenceChart from "./charts/ConfidenceChart";
import TrafficPieChart from "./charts/TrafficPieChart";
import TrafficBarChart from "./charts/TrafficBarChart";
import { useState } from "react";
import axios from "axios";

function PredictionForm({ setPrediction }) {
  const [formData, setFormData] = useState({
    Day: "Monday",
    Road_Name: "MG Road",
    Road_Type: "City Road",
    Rush_Hour: "No",
    Vehicle_Count: 100,
    Average_Speed: 40,
    Weather: "Sunny",
    Temperature: 30,
    Humidity: 60,
    Visibility: 500,
    Holiday: "No",
    Event: "Concert",
    Accident_Nearby: "No",
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const predictTraffic = async () => {
  setLoading(true);

  try {
    // Show spinner for 2 seconds (for testing)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      formData
    );

    setResult(response.data);
    setPrediction(response.data);

    const newPrediction = {
      time: new Date().toLocaleTimeString(),
      road: formData.Road_Name,
      traffic: response.data["Traffic Prediction"],
      travelTime: response.data["Estimated Travel Time"],
      confidence: response.data["Confidence"],
    };

    setHistory((prev) => [newPrediction, ...prev]);
    toast.success("Prediction completed successfully!");

  } catch (error) {
    console.log(error);
    toast.error("Prediction failed. Please try again.");
  } finally {
    setLoading(false);
  }
};
  const csvHeaders = [
  { label: "Time", key: "time" },
  { label: "Road", key: "road" },
  { label: "Traffic", key: "traffic" },
  { label: "Travel Time", key: "travelTime" },
  { label: "Confidence", key: "confidence" },
];
const generatePDF = () => {
  if (!result) {
    toast.error("Please make a prediction first!");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Smart Traffic Prediction Report", 20, 20);

  doc.setFontSize(12);

  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);
  doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 45);

  doc.text(`Road: ${formData.Road_Name}`, 20, 60);

  doc.text(
    `Traffic Level: ${result["Traffic Prediction"]}`,
    20,
    70
  );

  doc.text(
    `Confidence: ${result["Confidence"]}`,
    20,
    80
  );

  doc.text(
    `Travel Time: ${result["Estimated Travel Time"]}`,
    20,
    90
  );

  doc.text(
    `Suggested Route: ${result["Suggested Route"]}`,
    20,
    100
  );

  autoTable(doc, {
    startY: 120,
    head: [[
      "Time",
      "Road",
      "Traffic",
      "Travel Time",
      "Confidence"
    ]],
    body: history.map((item) => [
      item.time,
      item.road,
      item.traffic,
      item.travelTime,
      item.confidence,
    ]),
  });

  doc.save("Traffic_Prediction_Report.pdf");

  toast.success("PDF downloaded successfully!");
};
  return (
    <div className="container-fluid px-5 my-5">

      {/* Prediction Form */}

      <div className="card shadow-lg border-0 rounded-4 mt-5">

        <div className="card-body p-5">

          <h2 className="text-center text-primary fw-bold mb-5">
            🚦 Traffic Prediction Form
          </h2>

          <div className="row g-4">

            <div className="col-md-6">
              <label className="form-label">Day</label>
              <input
                className="form-control"
                name="Day"
                value={formData.Day}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Road Name</label>
              <input
                className="form-control"
                name="Road_Name"
                value={formData.Road_Name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Road Type</label>
              <input
                className="form-control"
                name="Road_Type"
                value={formData.Road_Type}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Rush Hour</label>
              <select
                className="form-select"
                name="Rush_Hour"
                value={formData.Rush_Hour}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Vehicle Count</label>
              <input
                type="number"
                className="form-control"
                name="Vehicle_Count"
                value={formData.Vehicle_Count}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Average Speed</label>
              <input
                type="number"
                className="form-control"
                name="Average_Speed"
                value={formData.Average_Speed}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Weather</label>
              <select
                className="form-select"
                name="Weather"
                value={formData.Weather}
                onChange={handleChange}
              >
                <option>Sunny</option>
                <option>Cloudy</option>
                <option>Rainy</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Temperature</label>
              <input
                type="number"
                className="form-control"
                name="Temperature"
                value={formData.Temperature}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Humidity</label>
              <input
                type="number"
                className="form-control"
                name="Humidity"
                value={formData.Humidity}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Visibility</label>
              <input
                type="number"
                className="form-control"
                name="Visibility"
                value={formData.Visibility}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Holiday</label>
              <select
                className="form-select"
                name="Holiday"
                value={formData.Holiday}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Event</label>
              <select
                className="form-select"
                name="Event"
                value={formData.Event}
                onChange={handleChange}
              >
                <option>Concert</option>
                <option>Festival</option>
                <option>Sports Match</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Accident Nearby</label>
              <select
                className="form-select"
                name="Accident_Nearby"
                value={formData.Accident_Nearby}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

          </div>

          <div className="text-center mt-5">
            <button
  className="btn btn-primary btn-lg px-5 d-flex align-items-center justify-content-center mx-auto"
  onClick={predictTraffic}
  disabled={loading}
>
  {loading ? (
    <>
      <ClipLoader color="#ffffff" size={20} />
      <span className="ms-2">Predicting...</span>
    </>
  ) : (
    "🚀 Predict Traffic"
  )}
</button>
          </div>

        </div>

      </div>

      {/* Prediction Result */}

      {result && (

        <div className="card shadow-lg border-0 rounded-4 mt-5">

          <div className="card-body p-5">

            <h2 className="text-center text-success mb-4">
              Prediction Result
            </h2>

            <div className="row text-center">

              <div className="col-md-4 mb-3">
                <h5>🚦 Traffic</h5>
                <h3>{result["Traffic Prediction"]}</h3>
              </div>

              <div className="col-md-4 mb-3">
                <h5>📊 Confidence</h5>
                <h3>{result["Confidence"]}</h3>
              </div>

              <div className="col-md-4 mb-3">
                <h5>🚗 Travel Time</h5>
                <h3>{result["Estimated Travel Time"]}</h3>
              </div>

              <div className="col-12 mt-4">
                <h5>🛣 Suggested Route</h5>
                <h3 className="text-primary">
                  {result["Suggested Route"]}
                </h3>
              </div>

            </div>

          </div>

        </div>

      )}

      {/* Prediction History */}

      {history.length > 0 && (

        <div
  className="card shadow-lg border-0 rounded-4 mt-5 mx-auto"
  style={{ maxWidth: "1400px" }}
>

          <div className="card-body">

            <h3 className="text-center text-primary mb-4">
              📜 Prediction History
            </h3>
            <div className="d-flex justify-content-end gap-3 mb-3">

  <CSVLink
    data={history}
    headers={csvHeaders}
    filename="Traffic_Predictions.csv"
    className="btn btn-success"
  >
    📥 Download CSV
  </CSVLink>

  <button
    className="btn btn-danger"
    onClick={generatePDF}
  >
    📄 Download PDF
  </button>

</div>

            <div className="table-responsive">

              <table className="table table-hover table-striped">

                <thead className="table-dark">
                  <tr>
                    <th>Time</th>
                    <th>Road</th>
                    <th>Traffic</th>
                    <th>Travel Time</th>
                    <th>Confidence</th>
                  </tr>
                </thead>

                <tbody>

                  {history.map((item, index) => (
                    <tr key={index}>
                      <td>{item.time}</td>
                      <td>{item.road}</td>
                      <td>{item.traffic}</td>
                      <td>{item.travelTime}</td>
                      <td>{item.confidence}</td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}
    <div
  className="row mt-5 g-4 mx-auto"
  style={{ maxWidth: "1400px" }}
>
  <div className="col-lg-4">
    <TrafficBarChart history={history} />
  </div>

  <div className="col-lg-4">
    <TrafficPieChart history={history} />
  </div>

  <div className="col-lg-4">
    <ConfidenceChart history={history} />
  </div>
  <TrafficMap />
  <DashboardStats history={history} />
  <AIAdvisor
  result={result}
  formData={formData}
/>
</div>
    </div>
  );
}

export default PredictionForm;