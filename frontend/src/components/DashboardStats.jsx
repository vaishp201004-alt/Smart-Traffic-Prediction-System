import CountUp from "react-countup";

function DashboardStats({ history }) {
  const totalPredictions = history.length;

  const highTrafficAlerts = history.filter(
    (item) =>
      item.traffic === "High" ||
      item.traffic === "Very High" ||
      item.traffic === "Severe"
  ).length;

  const averageConfidence =
    history.length > 0
      ? (
          history.reduce(
            (sum, item) => sum + parseFloat(item.confidence),
            0
          ) / history.length
        ).toFixed(1)
      : 0;

  const roadCount = {};

  history.forEach((item) => {
    roadCount[item.road] = (roadCount[item.road] || 0) + 1;
  });

  const mostUsedRoad =
    Object.keys(roadCount).length > 0
      ? Object.keys(roadCount).reduce((a, b) =>
          roadCount[a] > roadCount[b] ? a : b
        )
      : "N/A";

  const cards = [
    {
      title: "Total Predictions",
      value: totalPredictions,
      suffix: "",
    },
    {
      title: "High Traffic Alerts",
      value: highTrafficAlerts,
      suffix: "",
    },
    {
      title: "Average Confidence",
      value: averageConfidence,
      suffix: "%",
    },
    {
      title: "Most Used Road",
      value: mostUsedRoad,
      isText: true,
    },
  ];

  return (
    <div className="container my-5">
      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-md-3" key={index}>
            <div className="card shadow-lg border-0 rounded-4 h-100">
              <div className="card-body text-center">

                <h2 className="fw-bold text-primary">
  {card.value}
  {card.suffix}
</h2>
                <h5 className="mt-3 text-muted">
                  {card.title}
                </h5>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardStats;