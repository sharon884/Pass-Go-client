"use client"

import { useState, useEffect } from "react"

function Cta() {
  const [rotation, setRotation] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setRotation((prev) => prev + 180)
        setIsPaused(true)
        setTimeout(() => setIsPaused(false), 5000)
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <div className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Choose Your Journey
            </h2>
            <p className="text-xl text-gray-600">Every path leads to amazing experiences</p>
          </div>

          <div className="relative">
            {/* Main spinning container */}
            <div className="bg-white/60 backdrop-blur-sm rounded-full p-8 shadow-2xl border border-purple-100/50 relative overflow-hidden max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-blue-100/30 rounded-full"></div>

              <div
                className="relative z-10 transition-transform duration-1000 ease-in-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Get Tickets Card */}
                  <div
                    className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100/50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer relative overflow-hidden"
                    style={{ transform: `rotate(${-rotation}deg)` }}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-xl group-hover:scale-150 transition-transform duration-300"></div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                          />
                        </svg>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-3">Get Tickets</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">Every Ticket unlock a new memory</p>

                      <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-blue-700">
                        Browse Events
                      </button>
                    </div>
                  </div>

                  {/* Become a Host Card */}
                  <div
                    className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100/50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer relative overflow-hidden"
                    style={{ transform: `rotate(${-rotation}deg)` }}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-xl group-hover:scale-150 transition-transform duration-300"></div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-3">Become a Host</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">Turn your idea into a sold-out show.</p>

                      <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-purple-700">
                        Start Hosting
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cta
