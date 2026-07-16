function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="card shadow-lg p-3"
      style={{
        borderLeft: `6px solid ${color}`,
        borderRadius: "15px",
      }}
    >
      <h5>{icon} {title}</h5>

      <h3>{value}</h3>
    </div>
  );
}

export default StatCard;