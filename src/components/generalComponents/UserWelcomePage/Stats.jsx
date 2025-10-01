"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../../../contexts/ThemeContext"

function Stats() {
  const { theme } = useTheme()
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

  // Existing counter animation logic (Kept unchanged)
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
    if (num >= 100000) return `${(num / 1000).toFixed(0)}K+`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`
    return num.toLocaleString()
  }

  const styles = {
    containerBg: theme.colors.secondaryBg,
    primaryText: theme.colors.primaryText,
    secondaryText: theme.colors.secondaryText,
    cardBg: theme.colors.cardBg,
  }

  const statData = [
    {
      key: "users",
      value: counters.users,
      label: "Happy Users",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2a3 3 0 00-5.356-1.857M9 20V8m5-1a3 3 0 100-6 3 3 0 000 6zM4 17.21V20a2 2 0 002 2h2v-4a2 2 0 00-2-2H4a2 2 0 00-2 2v.21zm10.74 3.79c-3.14 0-5.7-2.3-6.28-5.32l.06-.21a1.99 1.99 0 011.82-1.85h.71a2 2 0 012 2v2"
          />
        </svg>
      ),
    },
    {
      key: "events",
      value: counters.events,
      label: "Events Hosted",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      key: "tickets",
      value: counters.tickets,
      label: "Tickets Sold",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: styles.containerBg }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-center mb-12"
          style={{ color: styles.primaryText }}
        >
          Our Impact. Your Trust.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {statData.map((stat) => (
            <div
              key={stat.key}
              // Enhanced card style with hover animation
              className="p-8 rounded-3xl shadow-xl transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl text-center group"
              style={{
                backgroundColor: styles.cardBg,
                border: `1px solid ${theme.colors.borderColor}`,
              }}
            >
              {/* Icon Container (Subtle rotation on group hover) */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg"
                style={{
                  background: theme.colors.primaryAccent,
                }}
              >
                {stat.icon}
              </div>
              
              {/* Value (Increased Size) */}
              <div
                className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent mb-2"
                style={{
                  backgroundImage: theme.colors.primaryAccent,
                  color: styles.primaryText,
                }}
              >
                {formatNumber(stat.value)}
              </div>
              
              {/* Label (Increased Size) */}
              <p
                className="text-md md:text-lg font-semibold uppercase tracking-wider"
                style={{ color: styles.secondaryText }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stats