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
      text: "Loved the simple UI. I found, booked, and shared tickets with friends in minutes! I can't wait for the next event.",
      name: "Sneha D.",
      avatar: "/story5.png",
    },
    {
      text: "Hosting my music night on PassGo boosted my visibility and trust. The platform is truly next-level.",
      name: "Ankit V.",
      avatar: "/story6.png",
    },
  ]

  const [currentSet, setCurrentSet] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % 2)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const styles = {
    containerBg: theme.colors.primaryBg,
    cardBg: theme.colors.cardBg,
    primaryText: theme.colors.primaryText,
    secondaryText: theme.colors.secondaryText,
    borderColor: theme.colors.borderColor,
  }

  // Slice stories into two sets of 3 for the carousel effect
  const displayedStories = stories.slice(currentSet * 3, currentSet * 3 + 3)

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
          Voices from Our Community
        </h2>
        <div className="relative overflow-hidden">
          {/* Transition Wrapper */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-in-out">
            {displayedStories.map((story, index) => (
              <div
                key={index}
                // Enhanced Card Style with Hover Animation
                className="p-6 rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:scale-[1.01] overflow-hidden"
                style={{
                  backgroundColor: styles.cardBg,
                  border: `1px solid ${styles.borderColor}`,
                }}
              >
                {/* Quote Text (Increased Size) */}
                <p
                  className="text-xl md:text-2xl italic font-medium mb-6 leading-relaxed"
                  style={{ color: styles.primaryText }}
                >
                  “{story.text}”
                </p>

                {/* User Info (Kept unchanged structurally) */}
                <div className="flex items-center mt-auto">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold text-lg"
                    style={{ background: theme.colors.primaryAccent }}
                  >
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: styles.primaryText }}>
                      {story.name}
                    </p>
                    <p className="text-sm" style={{ color: styles.secondaryText }}>
                      Verified User
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots (Kept unchanged structurally) */}
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
  )
}

export default UserStories