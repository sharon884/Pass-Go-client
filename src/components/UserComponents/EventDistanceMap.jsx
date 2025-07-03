"use client";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "../../utils/hostRelatedValidations/fixLeafletIcons"; // adjust path if needed

const haversineDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const EventDistanceMap = ({ eventCoords }) => {
  const [userCoords, setUserCoords] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(coords);

        if (eventCoords?.lat && eventCoords?.lng) {
          const dist = haversineDistance(coords, eventCoords);
          setDistance(dist.toFixed(2));
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    ,);
  }, [eventCoords]);

  if (!eventCoords || !userCoords) {
    return <p className="text-sm text-gray-500">Loading map...</p>;
  }

  return (
    <div className="space-y-2 mt-6">
      <h3 className="text-lg font-medium text-[#1F2937]">
        📍 Distance from your location
      </h3>
      <div style={{ height: "300px", width: "100%", borderRadius: "12px" }}>
        <MapContainer
          center={eventCoords}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={eventCoords} />
          <Marker position={userCoords} />
          <Polyline positions={[eventCoords, userCoords]} color="#5B3DF5" />
        </MapContainer>
      </div>
      <p className="text-sm text-gray-600">
        🛣️ You are approximately <strong>{distance} km</strong> away from the
        event location.
      </p>
    </div>
  );
};

export default EventDistanceMap;
