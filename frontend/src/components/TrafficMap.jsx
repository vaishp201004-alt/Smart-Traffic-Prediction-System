import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function TrafficMap() {
  const roads = [
    {
      name: "MG Road",
      position: [15.8497, 74.4977],
      traffic: "Low",
    },
    {
      name: "College Road",
      position: [15.8570, 74.5008],
      traffic: "Medium",
    },
    {
      name: "Ring Road",
      position: [15.8625, 74.5050],
      traffic: "High",
    },
    {
      name: "NH-48",
      position: [15.8450, 74.4900],
      traffic: "Very High",
    },
  ];

  return (
    <div className="card shadow-lg border-0 rounded-4 mt-5">

      <div className="card-body">

        <h2 className="text-center text-primary mb-4">
          🗺 Live Traffic Map
        </h2>

        <MapContainer
          center={[15.8497, 74.4977]}
          zoom={13}
          style={{
            height: "500px",
            width: "100%",
            borderRadius: "15px",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {roads.map((road, index) => (
            <Marker
              key={index}
              position={road.position}
            >
              <Popup>
                <h5>{road.name}</h5>

                <b>Traffic:</b> {road.traffic}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

      </div>

    </div>
  );
}

export default TrafficMap;