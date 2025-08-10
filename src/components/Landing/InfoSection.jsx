"use client"

import { useEffect, useRef, useState } from "react"
import { Rocket, BriefcaseBusiness, UserCheck, CheckCircle2, Music2, Palette, Shirt, Car } from "lucide-react"

const categories = [
  { name: "Music", image: "/music.png", icon: Music2 },
  { name: "Art", image: "/art.png", icon: Palette },
  { name: "Fashion", image: "/fashion.jpg", icon: Shirt },
  { name: "Motorsports", image: "/moto.jpg", icon: Car },
]

export default function InfoSection() {
  const [leftInView, setLeftInView] = useState(false)
  const [rightInView, setRightInView] = useState(false)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const opts = { threshold: 0.2 }
    const ioLeft = new IntersectionObserver(([e]) => e.isIntersecting && setLeftInView(true), opts)
    const ioRight = new IntersectionObserver(([e]) => e.isIntersecting && setRightInView(true), opts)
    if (leftRef.current) ioLeft.observe(leftRef.current)
    if (rightRef.current) ioRight.observe(rightRef.current)
    return () => {
      ioLeft.disconnect()
      ioRight.disconnect()
    }
  }, [])

  const FeatureBlock = ({ title, Icon, items, delay = 0 }) => (
    <div
      className={[
        "rounded-lg p-4 transition-all duration-700 ease-out",
        leftInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3",
        "hover:bg-indigo-50/60",
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
        <Icon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
        <span>{title}</span>
      </h3>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li
            key={t}
            className="flex items-start gap-2 text-gray-700 leading-relaxed transition-all duration-500"
            style={{ transitionDelay: `${delay + i * 80}ms` }}
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <section className="flex flex-col md:flex-row gap-6 p-6 md:p-12 bg-gray-50">
      {/* Left Box: Features */}
      <div
        ref={leftRef}
        className={[
          "md:w-1/2 bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-100",
          "transition-all duration-700 ease-out",
          leftInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
        ].join(" ")}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-500">
            Why Choose Pass-Go?
          </span>
        </h2>

        <div className="space-y-6">
          <FeatureBlock
            title="Platform Highlights"
            Icon={Rocket}
            delay={0}
            items={[
              "3-click ticket booking",
              "Easy to switch between user and host roles",
              "Real-time updates and booking confirmation",
            ]}
          />

          <FeatureBlock
            title="For Hosts"
            Icon={BriefcaseBusiness}
            delay={120}
            items={[
              "Low commission on ticket sales",
              "Advance payments before the event",
              "Full refund support system",
            ]}
          />

          <FeatureBlock
            title="For Users"
            Icon={UserCheck}
            delay={240}
            items={[
              "Secure checkout process",
              "Scam prevention with verified hosts",
              "Get instant e-tickets & event alerts",
            ]}
          />
        </div>
      </div>

      {/* Right Box: Categories */}
      <div
        ref={rightRef}
        className={[
          "md:w-1/2 bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-100",
          "transition-all duration-700 ease-out",
          rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
        ].join(" ")}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-500">
            Explore by Category
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat, index) => {
            const Icon = cat.icon
            return (
              <div
                key={index}
                className={[
                  "group relative rounded-xl overflow-hidden shadow-md border border-gray-100",
                  "transition-all duration-700 ease-out",
                  rightInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3",
                  "hover:shadow-xl hover:-translate-y-1",
                ].join(" ")}
                style={{ transitionDelay: `${150 + index * 120}ms` }}
              >
                {/* Image */}
                <img
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.name}
                  className="w-full h-36 md:h-40 object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:saturate-125"
                />

                {/* Top-left icon badge */}
                <div className="absolute top-2 left-2 rounded-md bg-white/85 backdrop-blur-sm px-2 py-1.5 shadow-sm flex items-center gap-2">
                  <Icon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                  <span className="text-xs font-semibold text-gray-800">{cat.name}</span>
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Bottom label */}
                <div
                  className="absolute bottom-0 left-0 right-0 text-center py-2 font-semibold text-gray-900 bg-gray-50/95 backdrop-blur-sm
                             translate-y-6 group-hover:translate-y-0 transition-transform duration-500"
                >
                  {cat.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
