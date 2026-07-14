import { useState } from "react";
import axios from "axios";

function PredictionForm() {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const predictTraffic = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );

      setResult(response.data);
    } catch (error) {
  console.log("FULL ERROR:", error);

  if (error.response) {
    console.log("Response:", error.response.data);
    console.log("Status:", error.response.status);
  } else {
    console.log("No response received.");
  }
}
  };

  return (
    <div className="form-container">

      <h2>Traffic Prediction Form</h2>

      <label>Day</label>
      <input name="Day" value={formData.Day} onChange={handleChange} />

      <label>Road Name</label>
      <input name="Road_Name" value={formData.Road_Name} onChange={handleChange} />

      <label>Road Type</label>
      <input name="Road_Type" value={formData.Road_Type} onChange={handleChange} />

      <label>Rush Hour</label>
      <select name="Rush_Hour" value={formData.Rush_Hour} onChange={handleChange}>
        <option>Yes</option>
        <option>No</option>
      </select>

      <label>Vehicle Count</label>
      <input
        type="number"
        name="Vehicle_Count"
        value={formData.Vehicle_Count}
        onChange={handleChange}
      />

      <label>Average Speed</label>
      <input
        type="number"
        name="Average_Speed"
        value={formData.Average_Speed}
        onChange={handleChange}
      />

      <label>Weather</label>
      <select name="Weather" value={formData.Weather} onChange={handleChange}>
        <option>Sunny</option>
        <option>Cloudy</option>
        <option>Rainy</option>
      </select>

      <label>Temperature</label>
      <input
        type="number"
        name="Temperature"
        value={formData.Temperature}
        onChange={handleChange}
      />

      <label>Humidity</label>
      <input
        type="number"
        name="Humidity"
        value={formData.Humidity}
        onChange={handleChange}
      />

      <label>Visibility</label>
      <input
        type="number"
        name="Visibility"
        value={formData.Visibility}
        onChange={handleChange}
      />

      <label>Holiday</label>
      <select name="Holiday" value={formData.Holiday} onChange={handleChange}>
        <option>Yes</option>
        <option>No</option>
      </select>

      <label>Event</label>
<select
  name="Event"
  value={formData.Event}
  onChange={handleChange}
>
  <option>Concert</option>
  <option>Festival</option>
  <option>Sports Match</option>
</select>
      <label>Accident Nearby</label>
      <select
        name="Accident_Nearby"
        value={formData.Accident_Nearby}
        onChange={handleChange}
      >
        <option>Yes</option>
        <option>No</option>
      </select>

      <button onClick={predictTraffic}>
        🚀 Predict
      </button>

      {result && (
        <div style={{ marginTop: "25px" }}>
          <h2>Prediction Result</h2>

          <p><b>Traffic Prediction:</b> {result["Traffic Prediction"]}</p>

          <p><b>Traffic Color:</b> {result["Traffic Color"]}</p>

          <p><b>Estimated Travel Time:</b> {result["Estimated Travel Time"]}</p>

          <p><b>Suggested Route:</b> {result["Suggested Route"]}</p>

          <p><b>Confidence:</b> {result["Confidence"]}</p>
        </div>
      )}

    </div>
  );
}

export default PredictionForm;