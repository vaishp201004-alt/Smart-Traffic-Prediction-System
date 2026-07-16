import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function TrafficPieChart({ history }) {
  const counts = {
    Low: 0,
    Medium: 0,
    High: 0,
    "Very High": 0,
  };

  history.forEach((item) => {
    if (counts[item.traffic] !== undefined) {
      counts[item.traffic]++;
    }
  });

  const data = {
    labels: [
      "Low",
      "Medium",
      "High",
      "Very High",
    ],

    datasets: [
      {
        data: [
          counts.Low,
          counts.Medium,
          counts.High,
          counts["Very High"],
        ],

        backgroundColor: [
          "#28a745",
          "#ffc107",
          "#fd7e14",
          "#dc3545",
        ],

        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },

      title: {
        display: true,
        text: "Traffic Distribution",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 h-100">
      <div className="card-body">

        <div style={{ height: "420px" }}>
          <Pie data={data} options={options} />
        </div>

      </div>
    </div>
  );
}

export default TrafficPieChart;