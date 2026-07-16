import "./App.css";
import { useState } from "react";

import Header from "./components/Header";
import PredictionForm from "./components/PredictionForm";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"}>

      <div className="container-fluid p-3 text-end">

        <button
          className={darkMode ? "btn btn-warning" : "btn btn-dark"}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

      </div>

      <Header prediction={prediction} />

      <PredictionForm setPrediction={setPrediction} />

    </div>
  );
}

export default App;