"use client"

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import L from "leaflet"
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch"
import "leaflet/dist/leaflet.css"
import "leaflet-geosearch/dist/geosearch.css"
import "../../../utils/hostRelatedValidations/fixLeafletIcons"

const SearchControl = ({ setValue, setPosition, setLocationName }) => {
  const map = useMap()

  useEffect(() => {
    const provider = new OpenStreetMapProvider()
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoClose: true,
      showMarker: true,
      retainZoomLevel: false,
    })

    map.addControl(searchControl)

    const handleResult = (result) => {
      const { x: lng, y: lat, label } = result.location
      setPosition([lat, lng])
      setLocationName(label)
      setValue("coordinates", { lat, lng }, { shouldValidate: true })
      setValue("location", label, { shouldValidate: true })
    }

    map.on("geosearch/showlocation", handleResult)

    return () => {
      map.off("geosearch/showlocation", handleResult)
      map.removeControl(searchControl)
    }
  }, [map])

  return null
}

const LocationMarker = ({ setValue, position, setPosition, setLocationName }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setPosition([lat, lng])
      setValue("coordinates", { lat, lng }, { shouldValidate: true })
      fetchReverseGeocode(lat, lng, setLocationName, setValue)
    },
  })

  return position ? <Marker position={position} /> : null
}

// 🌐 Reverse geocode using Nominatim
const fetchReverseGeocode = async (lat, lng, setLocationName, setValue) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    )
    const data = await res.json()
    const displayName = data?.display_name || "Unknown location"
    setLocationName(displayName)
    setValue("location", displayName, { shouldValidate: true })
  } catch (err) {
    setLocationName("Unable to fetch address")
  }
}

const LocationPicker = () => {
  const { setValue, watch } = useFormContext()
  const selectedCoordinates = watch("coordinates")
  const [position, setPosition] = useState(
    selectedCoordinates ? [selectedCoordinates.lat, selectedCoordinates.lng] : [9.9312, 76.2673]
  )
  const [locationName, setLocationName] = useState("")

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">Search or click to select event location</label>

      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "300px", width: "100%", borderRadius: "12px", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl
          setValue={setValue}
          setPosition={setPosition}
          setLocationName={setLocationName}
        />
        <LocationMarker
          setValue={setValue}
          position={position}
          setPosition={setPosition}
          setLocationName={setLocationName}
        />
      </MapContainer>

      {locationName && (
        <p className="text-sm text-gray-700">
          📍 Selected Location: <span className="font-semibold">{locationName}</span>
        </p>
      )}
    </div>
  )
}

export default LocationPicker
