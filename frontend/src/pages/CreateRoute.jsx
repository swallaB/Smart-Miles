import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function CreateRoute() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Route</h2>
      <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[12.9716, 77.5946]}>
          <Popup>Delivery Start Point</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
