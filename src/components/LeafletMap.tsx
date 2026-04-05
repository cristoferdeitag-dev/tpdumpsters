"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet + webpack
const defaultIcon = L.icon({
  iconUrl: "/images/leaflet/marker-icon.png",
  iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
  shadowUrl: "/images/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const locations = [
  { name: "Castro Valley", lat: 37.712578, lng: -122.107887 },
  { name: "San Leandro", lat: 37.704954, lng: -122.207317 },
  { name: "Oakland", lat: 37.804363, lng: -122.271114 },
  { name: "Berkeley", lat: 37.871593, lng: -122.272747 },
  { name: "El Cerrito", lat: 37.915764, lng: -122.311638 },
  { name: "Richmond", lat: 37.935757, lng: -122.347748 },
  { name: "San Rafael", lat: 37.973535, lng: -122.531087 },
  { name: "Novato", lat: 38.107419, lng: -122.569703 },
  { name: "Petaluma", lat: 38.232417, lng: -122.636652 },
  { name: "Cotati", lat: 38.326859, lng: -122.707212 },
  { name: "Santa Rosa", lat: 38.440429, lng: -122.714055 },
  { name: "Sonoma", lat: 38.291859, lng: -122.458035 },
  { name: "Napa", lat: 38.297538, lng: -122.285529 },
  { name: "American Canyon", lat: 38.174917, lng: -122.260804 },
  { name: "Vallejo", lat: 38.104086, lng: -122.256637 },
  { name: "Rodeo", lat: 38.033035, lng: -122.266914 },
  { name: "Hercules", lat: 38.017144, lng: -122.288581 },
  { name: "Pinole", lat: 38.004366, lng: -122.298858 },
  { name: "San Pablo", lat: 37.962146, lng: -122.345526 },
  { name: "Concord", lat: 37.977977, lng: -122.031073 },
  { name: "Walnut Creek", lat: 37.910078, lng: -122.065182 },
  { name: "Martinez", lat: 38.019365, lng: -122.134132 },
  { name: "Albany", lat: 37.88687, lng: -122.297747 },
  { name: "Emeryville", lat: 37.831316, lng: -122.285247 },
  { name: "Hayward", lat: 37.668821, lng: -122.080796 },
  { name: "Benicia", lat: 38.049365, lng: -122.158586 },
  { name: "Fairfield", lat: 38.249358, lng: -122.039966 },
  { name: "Vacaville", lat: 38.356577, lng: -121.987744 },
];

export default function LeafletMap() {
  return (
    <MapContainer
      center={[38.1, -122.3]}
      zoom={9.5}
      scrollWheelZoom={false}
      className="h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden mb-5"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker key={loc.name} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
