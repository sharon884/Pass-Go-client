"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchEvents } from "../../../services/general/EventAnalytics"
import dayjs from "dayjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

const AdminEventListing = () => {
  const [runningEvents, setRunningEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const navigate = useNavigate()

  const loadRunningEvents = async () => {
    try {
      setLoading(true)
      const params = {
        status: "approved",
        advancePaid: true,
        isApproved: true,
        sortBy: "date",
        order: "asc",
      }
      if (search.trim()) params.search = search
      if (selectedDate) params.date = selectedDate
      const data = await fetchEvents({ params })
      setRunningEvents(data.events || [])
    } catch (error) {
      console.error("Failed to fetch running events:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRunningEvents()
  }, [search, selectedDate])

  const handleViewDetails = (eventId) => {
    navigate(`/admin/event-management/details/${eventId}`)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Currently Running Events</h2>
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full md:w-1/4"
        />
        {selectedDate && (
          <Button variant="ghost" onClick={() => setSelectedDate("")} className="text-red-600">
            Clear Date
          </Button>
        )}
      </div>
      {/* Event Listing */}
      {loading ? (
        <p>Loading events...</p>
      ) : runningEvents.length === 0 ? (
        <p>No running events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {runningEvents.map((event) => (
            <Card key={event._id} className="shadow">
              <CardContent className="pt-4">
                <CardTitle className="text-xl mb-1">{event.title}</CardTitle>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <p className="text-sm">
                  <strong>Location:</strong> {event.locationName || "Location not specified"}
                </p>
                <p className="text-sm">
                  <strong>Date:</strong> {dayjs(event.date).format("DD MMM YYYY")}
                </p>
                <p className="text-sm">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="text-sm">
                  <strong>Type:</strong> {event.eventType}
                </p>
                <p className="text-sm">
                  <strong>Category:</strong> {event.category}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong> {event.status}
                </p>
                <p className="text-sm">
                  <strong>Approved:</strong> {event.isApproved ? "Yes" : "No"}
                </p>
                <Button className="mt-3 w-full" onClick={() => handleViewDetails(event._id)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminEventListing
