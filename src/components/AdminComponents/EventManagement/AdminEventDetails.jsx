"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEventBookingsSummary } from "../../../services/general/EventAnalytics"
import dayjs from "dayjs"

const AdminEventDetails = () => {
  const { eventId } = useParams()
  const [eventData, setEventData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState("summary")
  const [hoveredMetric, setHoveredMetric] = useState(null)

  const COMMISSION_RATE = 10

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await getEventBookingsSummary(eventId)
      if (res.success) {
        setEventData(res.data)
      } else {
        console.error(res.message)
      }
      setLoading(false)
    }
    fetchDetails()
  }, [eventId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Loading skeleton with corporate style */}
            <div className="col-span-12 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="col-span-3 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="animate-pulse space-y-3">
                  <div className="h-12 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 mx-auto mb-4 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <h3 className="text-xl font-semibold mb-2">Data Unavailable</h3>
          <p className="text-gray-400">Unable to load event analytics</p>
        </div>
      </div>
    )
  }

  const { event, ticketStats, totalRevenue, ticketsSold, dailySales, offer } = eventData
  const isPaid = event.type.startsWith("paid")
  const adminCommission = isPaid ? (totalRevenue * COMMISSION_RATE) / 100 : 0
  const hostEarning = isPaid ? totalRevenue - adminCommission : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Corporate Header */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium uppercase tracking-wider">
                  LIVE EVENT MONITORING
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
              <p className="text-gray-400">Administrative Overview & Commission Tracking</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">Event ID</div>
              <div className="text-white font-mono text-lg">{eventId}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 bg-gray-800/40 p-2 rounded-xl border border-gray-700">
          {[
            { id: "summary", label: "Financial Summary", icon: "💰" },
            { id: "analytics", label: "Performance Analytics", icon: "📊" },
            { id: "commission", label: "Commission Details", icon: "🏦" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
                        ${
                          activeView === tab.id
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                        }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Revenue",
              value: `₹${totalRevenue}`,
              change: "+12.5%",
              positive: true,
              icon: "💵",
              description: "Gross event revenue",
            },
            {
              label: "Admin Commission",
              value: `₹${adminCommission.toFixed(2)}`,
              change: `${COMMISSION_RATE}%`,
              positive: true,
              icon: "🏛️",
              description: "Platform commission earned",
            },
            {
              label: "Host Earnings",
              value: `₹${hostEarning.toFixed(2)}`,
              change: "+8.3%",
              positive: true,
              icon: "👤",
              description: "Host net earnings",
            },
            {
              label: "Tickets Sold",
              value: ticketsSold,
              change: "+15.2%",
              positive: true,
              icon: "🎫",
              description: "Total tickets purchased",
            },
          ].map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6 
                         transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 
                         hover:border-blue-500/50 cursor-pointer group
                         ${hoveredMetric === index ? "ring-2 ring-blue-500/30" : ""}`}
              onMouseEnter={() => setHoveredMetric(index)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl group-hover:scale-110 transition-transform">{metric.icon}</div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                               ${metric.positive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                >
                  {metric.change}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{metric.label}</h3>
                <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {metric.value}
                </div>
                <p className="text-gray-500 text-xs">{metric.description}</p>
              </div>

              {/* Animated progress bar */}
              <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 rounded-full
                               ${metric.positive ? "bg-gradient-to-r from-green-500 to-blue-500" : "bg-gradient-to-r from-red-500 to-orange-500"}
                               ${hoveredMetric === index ? "w-full" : "w-0"}`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Event Details Table */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Event Information
            </h3>
            <div className="space-y-4">
              {[
                { label: "Event Type", value: event.type.replace(/_/g, " ").toUpperCase(), icon: "🎭" },
                { label: "Event Date", value: dayjs(event.date).format("MMM DD, YYYY"), icon: "📅" },
                { label: "Category", value: event.category, icon: "🏷️" },
                { label: "Location", value: event.location, icon: "📍" },
                { label: "Status", value: event.status.toUpperCase(), icon: "⚡" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-400 font-medium">{item.label}</span>
                  </div>
                  <span className="text-white font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket Statistics */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Ticket Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(ticketStats).map(([category, stats]) => {
                const percentage = stats.total > 0 ? (stats.sold / stats.total) * 100 : 0
                return (
                  <div
                    key={category}
                    className="p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold capitalize">{category}</h4>
                      <span className="text-blue-400 font-bold">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div className="text-center">
                        <div className="text-green-400 font-bold text-lg">{stats.sold}</div>
                        <div className="text-gray-500">Sold</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-400 font-bold text-lg">{stats.total}</div>
                        <div className="text-gray-500">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-orange-400 font-bold text-lg">{stats.remaining}</div>
                        <div className="text-gray-500">Remaining</div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Commission Analysis */}
        {isPaid && (
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-3xl">🏦</span>
              Commission Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-500/30">
                <div className="text-4xl mb-4">💰</div>
                <div className="text-3xl font-bold text-white mb-2">₹{totalRevenue}</div>
                <div className="text-blue-400 font-medium">Gross Revenue</div>
                <div className="text-gray-500 text-sm mt-2">Total event earnings</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-500/30">
                <div className="text-4xl mb-4">🏛️</div>
                <div className="text-3xl font-bold text-white mb-2">₹{adminCommission.toFixed(2)}</div>
                <div className="text-green-400 font-medium">Platform Commission</div>
                <div className="text-gray-500 text-sm mt-2">{COMMISSION_RATE}% of gross revenue</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500/30">
                <div className="text-4xl mb-4">👤</div>
                <div className="text-3xl font-bold text-white mb-2">₹{hostEarning.toFixed(2)}</div>
                <div className="text-orange-400 font-medium">Host Earnings</div>
                <div className="text-gray-500 text-sm mt-2">{100 - COMMISSION_RATE}% of gross revenue</div>
              </div>
            </div>
          </div>
        )}

        {/* Daily Sales Chart */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-8">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-3xl">📈</span>
            Sales Timeline
          </h3>
          <div className="space-y-4">
            {dailySales.length > 0 ? (
              dailySales.map((sale, index) => (
                <div
                  key={sale._id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{dayjs(sale._id).format("MMMM DD, YYYY")}</div>
                      <div className="text-gray-400 text-sm">{dayjs(sale._id).format("dddd")}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{sale.count}</div>
                    <div className="text-gray-500 text-sm">tickets sold</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <div className="text-gray-400 text-lg">No sales data available</div>
              </div>
            )}
          </div>
        </div>

        {/* Free Event Notice */}
        {!isPaid && (
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">Free Event</h3>
            <p className="text-green-400 text-lg font-semibold">No commission applicable for free events</p>
            <p className="text-gray-400 mt-2">This event generates no revenue for the platform</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminEventDetails
