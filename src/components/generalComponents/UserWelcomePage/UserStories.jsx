"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../../../contexts/ThemeContext"

function UserStories() {
  const { theme } = useTheme()

  const stories = [
    {
      text: "PassGo helped me organize my first stand-up night. Smooth experience, quick payouts!",
      name: "Neha S.",
      avatar: "/story1.png",
    },
    {
      text: "Booked tickets in just 3 clicks. No spam, no confusion. Best platform ever!",
      name: "Arjun M.",
      avatar: "/story2.png",
    },
    {
      text: "We hosted a college fest with 1000+ attendees. PassGo managed everything seamlessly.",
      name: "Priya T.",
      avatar: "/story3.png",
    },
    {
      text: "Being a first-time event host, I was nervous. PassGo's support made it so easy.",
      name: "Rahul J.",
      avatar: "/story4.png",
    },
    {
      text: "Loved the simple UI. I found, booked, and shared tickets with friends in minutes!",
      name: "Sneha D.",
      avatar: "/story5.png",
    },
    {
      text: "Hosting my music night on PassGo boosted my visibility and trust.",
      name: "Ankit V.",
      avatar: "/story6.png",
    },
  ]

  const [currentSet, setCurrentSet] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentSet((prev) => (prev === 0 ? 1 : 0))
        setIsVisible(true)
      }, 500)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const getCurrentStories = () => {
    return currentSet === 0 ? stories.slice(0, 3) : stories.slice(3, 6)
  }

  return (
    <div className="py-20 relative overflow-hidden" style={{ background: theme.colors.primaryBg }}>
      <div className="absolute inset-0" style={{ background: theme.colors.secondaryBg }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-4"
              style={{
                backgroundImage: theme.colors.primaryAccent,
                color: theme.colors.primaryText,
              }}
            >
              Stories from Our Community
            </h2>
            <p className="text-xl" style={{ color: theme.colors.secondaryText }}>
              Real experiences from real people
            </p>
          </div>

          <div
            className="backdrop-blur-sm rounded-3xl shadow-2xl border p-8 relative overflow-hidden"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderColor: theme.colors.borderColor,
              boxShadow: `0 25px 50px ${theme.colors.glowColor}`,
            }}
          >
            <div
              className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl"
              style={{ background: theme.colors.shape1 }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl"
              style={{ background: theme.colors.shape2 }}
            ></div>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500 transform relative z-10 ${
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              {getCurrentStories().map((story, index) => (
                <div
                  key={`${currentSet}-${index}`}
                  className="rounded-2xl p-6 shadow-xl border transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden"
                  style={{
                    backgroundColor: theme.colors.cardBg,
                    borderColor: theme.colors.borderColor,
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl group-hover:scale-150 transition-transform duration-300"
                    style={{ background: theme.colors.shape1 }}
                  ></div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <svg className="w-8 h-8 mb-4" fill={theme.colors.accentText} viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="leading-relaxed text-lg italic" style={{ color: theme.colors.primaryText }}>
                        {story.text}
                      </p>
                    </div>

                    <div
                      className="flex items-center space-x-4 pt-4 border-t"
                      style={{ borderColor: theme.colors.borderColor }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ background: theme.colors.primaryAccent }}
                      >
                        {story.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: theme.colors.primaryText }}>
                          {story.name}
                        </p>
                        <p className="text-sm" style={{ color: theme.colors.secondaryText }}>
                          Verified User
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSet === 0 ? "w-8" : ""}`}
                style={{
                  background: currentSet === 0 ? theme.colors.primaryAccent : theme.colors.borderColor,
                }}
              ></div>
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSet === 1 ? "w-8" : ""}`}
                style={{
                  background: currentSet === 1 ? theme.colors.primaryAccent : theme.colors.borderColor,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserStories
