"use client"

import { useEffect, useState } from "react"
import { Ticket, Calendar, Users, MapPin, Clock, Star } from "lucide-react"
import Footer from "./Footer"
import Navbar from "./Navbar"
import PassGoLogo from "./logo"

function ScatteredElement({ icon, x, y, delay, size }) {
  const [opacity, setOpacity] = useState(0.1)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setOpacity((prev) => {
          const time = Date.now() / 4000
          const wave = Math.sin(time + x * 0.01 + y * 0.01) * 0.3 + 0.7
          return Math.max(0.2, Math.min(1, wave))
        })
      }, 150)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, x, y])

  return (
    <div
      className="absolute transition-opacity duration-500"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        opacity: opacity * 0.6,
      }}
    >
      <div
        className="flex items-center justify-center rounded-md bg-slate-100 border border-slate-200"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          color: "#7454FD",
        }}
      >
        {icon}
      </div>
    </div>
  )
}

function ScatteredTicketElements() {
  const icons = [
    { icon: <Ticket size={10} /> },
    { icon: <Calendar size={9} /> },
    { icon: <Users size={10} /> },
    { icon: <MapPin size={8} /> },
    { icon: <Clock size={9} /> },
    { icon: <Star size={8} /> },
  ]

  const elements = []
  for (let i = 0; i < 60; i++) {
    const randomIcon = icons[Math.floor(Math.random() * icons.length)]
    const x = Math.random() * 80 + 10
    const y = Math.random() * 80 + 10
    const delay = Math.random() * 3000
    const size = Math.random() * 4 + 16

    elements.push(<ScatteredElement key={i} icon={randomIcon.icon} x={x} y={y} delay={delay} size={size} />)
  }

  return <div className="absolute inset-0">{elements}</div>
}

export default function PassGoLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      {/* Navigation */}
      {/* <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#7454FD" }}>
              <span className="text-white font-semibold text-sm">P</span>
            </div>
            <span className="font-semibold text-gray-900">PassGo</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              About
            </a>
            <button
              className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: "#7454FD" }} 
            >
              Get Started
            </button>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Content */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-12">
          <div className="max-w-lg">
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">PassGo</h1>
                <div className="w-16 h-1 rounded-full" style={{ backgroundColor: "#7454FD" }}></div>
              </div>

              {/* Subtitle */}
              <div className="space-y-3">
                <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed">
                  Great events create great memories
                </p>
                <p className="text-lg font-medium" style={{ color: "#7454FD" }}>
                  Make every ticket count
                </p>
                <p className="text-gray-600">Professional event management platform trusted by organizers worldwide</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  className="text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:opacity-90"
                  style={{ backgroundColor: "#7454FD" }}
                >
                  Start Free Trial
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 space-y-3">
                <p className="text-sm text-gray-500">Trusted by 10,000+ event organizers</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">4.9/5</span>
                  </div>
                  <div className="text-sm text-gray-500">•</div>
                  <div className="text-sm text-gray-500">SOC 2 Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Animated Elements */}
        <div className="flex-1 relative bg-gray-50/30">
          <ScatteredTicketElements />
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why choose PassGo?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and grow successful events
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#7454FD1A" }}
              >
                <Ticket style={{ color: "#7454FD" }} size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Ticketing</h3>
              <p className="text-gray-600 text-sm">Advanced ticket management with real-time analytics</p>
            </div>
            <div className="text-center p-6">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#7454FD1A" }}
              >
                <Users style={{ color: "#7454FD" }} size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Attendee Management</h3>
              <p className="text-gray-600 text-sm">Seamless check-in and attendee engagement tools</p>
            </div>
            <div className="text-center p-6">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#7454FD1A" }}
              >
                <Calendar style={{ color: "#7454FD" }} size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Event Planning</h3>
              <p className="text-gray-600 text-sm">Complete event lifecycle management platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6" style={{ backgroundColor: "#7454FD" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to create amazing events?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who trust PassGo to bring their vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              style={{ color: "#7454FD" }}
            >
              Start Your Free Trial
            </button>
            <button
              className="border-2 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:opacity-90 transition-all duration-200"
              style={{
                borderColor: "white",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "white"
                e.currentTarget.style.color = "#7454FD"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "white"
              }}
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
      <PassGoLogo/>
      <Footer/>
    </div>
  )
}
