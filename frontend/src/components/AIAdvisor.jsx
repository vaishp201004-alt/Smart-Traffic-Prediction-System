function AIAdvisor({ result, formData }) {
  if (!result) return null;

  const advice = [];

  const traffic = result["Traffic Prediction"];

  if (traffic === "Very High") {
    advice.push("🚨 Heavy congestion detected.");
    advice.push("🛣 Use alternate routes if possible.");
  }

  if (traffic === "High") {
    advice.push("⚠ Traffic is higher than normal.");
  }

  if (traffic === "Medium") {
    advice.push("🚗 Moderate traffic. Drive normally.");
  }

  if (traffic === "Low") {
    advice.push("✅ Roads are mostly clear.");
  }

  if (formData.Rush_Hour === "Yes") {
    advice.push("⏰ Rush hour may increase delays.");
  }

  if (formData.Accident_Nearby === "Yes") {
    advice.push("🚑 Accident nearby. Drive carefully.");
  }

  if (formData.Weather === "Rainy") {
    advice.push("🌧 Rain may reduce visibility.");
  }

  if (formData.Holiday === "Yes") {
    advice.push("🎉 Holiday traffic may change road conditions.");
  }

  return (
    <div className="card shadow-lg border-0 rounded-4 mt-5">
      <div className="card-body">
        <h3 className="text-center text-primary mb-4">
          🤖 AI Traffic Advisor
        </h3>

        <ul className="list-group">

          {advice.map((item, index) => (

            <li
              key={index}
              className="list-group-item"
            >
              {item}
            </li>

          ))}

        </ul>
      </div>
    </div>
  );
}

export default AIAdvisor;