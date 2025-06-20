"use client"

import { useState, useEffect } from "react"

function Stats() {
  const [counters, setCounters] = useState({
    users: 0,
    events: 0,
    tickets: 0,
  })

  const finalValues = {
    users: 10000,
    events: 2300,
    tickets: 100000,
  }

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    const intervals = Object.keys(finalValues).map((key) => {
      const increment = finalValues[key] / steps
      let currentValue = 0

      return setInterval(() => {
        currentValue += increment
        if (currentValue >= finalValues[key]) {
          currentValue = finalValues[key]
          clearInterval(intervals.find((interval) => interval === this))
        }
        setCounters((prev) => ({
          ...prev,
          [key]: Math.floor(currentValue),
        }))
      }, stepDuration)
    })

    return () => intervals.forEach((interval) => clearInterval(interval))
  }, [])

  const formatNumber = (num) => {
    if (num >= 100000) return `${(num / 100000).toFixed(0)}L+`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`
    return `${num}+`
  }

  return (
    <div className="py-20 bg-gradient-to-br from-white via-purple-50/20 to-blue-50/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/10 to-blue-100/10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600">Numbers that speak for themselves</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100/50 p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {/* Users */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {formatNumber(counters.users)}
                </div>
                <p className="text-gray-600 text-lg font-medium">Trusted Users</p>
              </div>

              {/* Events */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {formatNumber(counters.events)}
                </div>
                <p className="text-gray-600 text-lg font-medium">Events Hosted</p>
              </div>

              {/* Tickets */}
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {formatNumber(counters.tickets)}
                </div>
                <p className="text-gray-600 text-lg font-medium">Tickets Sold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
