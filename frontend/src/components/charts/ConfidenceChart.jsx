import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ConfidenceChart({ history }) {

  const data = {
    labels: history.map((_, index) => `Prediction ${index + 1}`),

    datasets: [
      {
        label: "Confidence (%)",

        data: history.map((item) =>
          parseFloat(item.confidence)
        ),

        borderColor: "#0d6efd",
        backgroundColor: "#0d6efd",

        pointBackgroundColor: "#0d6efd",
        pointRadius: 5,
        pointHoverRadius: 7,

        tension: 0.4,
        fill: true,

        backgroundColor: "rgba(13,110,253,0.15)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Confidence Trend",
        font: {
          size: 18,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 100,

        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 h-100">

      <div className="card-body">

        <div style={{ height: "420px" }}>
          <Line
            data={data}
            options={options}
          />
        </div>

      </div>

    </div>
  );
}

export default ConfidenceChart;