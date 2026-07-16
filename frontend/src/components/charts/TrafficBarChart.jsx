import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TrafficBarChart({ history }) {
  const low = history.filter(
    (item) => item.traffic === "Low"
  ).length;

  const medium = history.filter(
    (item) => item.traffic === "Medium"
  ).length;

  const high = history.filter(
    (item) => item.traffic === "High"
  ).length;

  const veryHigh = history.filter(
    (item) =>
      item.traffic === "Very High" ||
      item.traffic === "Severe"
  ).length;

  const data = {
    labels: ["Low", "Medium", "High", "Very High"],
    datasets: [
      {
        label: "Traffic Predictions",
        data: [low, medium, high, veryHigh],
        backgroundColor: [
          "#28a745",
          "#ffc107",
          "#fd7e14",
          "#dc3545",
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Traffic Prediction Analytics",
        font: {
          size: 18,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 h-100">
      <div className="card-body">
        <div style={{ height: "420px" }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default TrafficBarChart;