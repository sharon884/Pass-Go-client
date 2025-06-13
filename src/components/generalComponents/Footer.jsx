"use client"

import { useState, useEffect } from "react"
import { Facebook, Github, Mail, Phone, MapPin, Twitter } from "lucide-react"

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Add animation styles for the ticket
  const ticketSpinStyles = `
  @keyframes ticketSpin {
    0% {
      transform: translateY(-20px) rotate(0deg) scale(0.5);
      opacity: 0;
    }
    25% {
      transform: translateY(-10px) rotate(90deg) scale(0.7);
      opacity: 0.5;
    }
    50% {
      transform: translateY(0px) rotate(180deg) scale(1);
      opacity: 1;
    }
    75% {
      transform: translateY(2px) rotate(270deg) scale(1.1);
      opacity: 1;
    }
    100% {
      transform: translateY(0px) rotate(360deg) scale(1);
      opacity: 1;
    }
  }
  .ticket-spin-animation {
    animation: ticketSpin 2s ease-in-out infinite;
  }
`

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#1A064F" }}>
      <style dangerouslySetInnerHTML={{ __html: ticketSpinStyles }} />

      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 left-10 w-12 h-12 bg-white/5 rounded-full animate-pulse"></div>
        <div
          className="absolute top-8 right-20 w-8 h-8 bg-white/3 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-4 left-1/4 w-6 h-6 bg-white/4 rounded-full animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
          {/* Left Section - About (Compact) */}
          <div
            className={`lg:col-span-1 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                MakePass with
              </span>
              <span className="ml-2 text-white relative">
                PassGo!
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
              </span>
            </h3>

            <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
              <p>
                <span className="font-semibold text-white">For Hosts</span> – Create and manage events, track sales,
                connect with audiences.
              </p>
              <p>
                <span className="font-semibold text-white">For Users</span> – Discover events, book tickets
                effortlessly, enjoy seamless experiences.
              </p>
            </div>
          </div>

          {/* Middle Section - Links */}
          <div
            className={`grid grid-cols-2 gap-6 transform transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            {/* Get Help */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Get Help</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Tickets
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Contact & Social */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h4 className="text-sm font-semibold text-white mb-3">Contact Us</h4>
            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-white" />
                <span>123 Main Street, CA 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-white" />
                <span>+1(123) 458-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-white" />
                <span>hello@passgo.com</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
              >
                <Facebook size={16} className="text-white group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
              >
                <Github size={16} className="text-white group-hover:text-gray-300 transition-colors" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
              >
                <Twitter size={16} className="text-white group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Compact */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            {/* Animated PassGo Brand - Smaller */}
            <div
              className={`transform transition-all duration-1000 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <h2 className="text-2xl md:text-3xl font-bold relative group cursor-pointer flex items-center">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-pulse">
                  Pass
                </span>
                {/* Spinning Ticket Logo */}
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 mx-1 text-white ticket-spin-animation"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  ></path>
                </svg>
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-pulse">
                  Go
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-700"></div>
              </h2>
              <p className="text-gray-400 text-xs mt-1">Your Gateway to Amazing Events</p>
            </div>

            {/* Copyright - Compact */}
            <div
              className={`text-center md:text-right transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <p className="text-gray-400 text-xs">
                © 2024 PassGo. All rights reserved. |
                <a href="#" className="hover:text-white transition-colors ml-1">
                  Privacy
                </a>{" "}
                |
                <a href="#" className="hover:text-white transition-colors ml-1">
                  Terms
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
