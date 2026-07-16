import StatCard from "./StatCard";

function Dashboard() {
  return (
    <div className="container mt-4">

      <div className="row">

        <div className="col-md-3 mb-3">
          <StatCard
            title="Traffic"
            value="Waiting..."
            icon="🚦"
            color="red"
          />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard
            title="Confidence"
            value="--%"
            icon="📈"
            color="green"
          />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard
            title="Travel Time"
            value="--"
            icon="🚗"
            color="orange"
          />
        </div>

        <div className="col-md-3 mb-3">
          <StatCard
            title="Route"
            value="--"
            icon="🛣"
            color="blue"
          />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;