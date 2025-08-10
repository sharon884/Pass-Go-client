"use client"

import { useEffect, useState } from "react"
import { CalendarDays, MapPin } from "lucide-react"
import { fetchLandingRunningEvents } from "../../services/general/landingServices"

const RunningEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchLandingRunningEvents()
        setEvents(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error loading landing events", error)
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [])

  // Compact, fully styled marquee
  // Adjust speed by count; ensure it’s not too fast.
  const marqueeDuration = `${Math.max(20, (events?.length || 6) * 3.2)}s`

  return (
    <section className="p-6 md:p-12 bg-white">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-500">
          {"This Week's Events"}
        </span>
      </h2>

      {loading ? (
        <TrackSkeleton />
      ) : events.length === 0 ? (
        <p className="text-center text-gray-600">{"No events this week."}</p>
      ) : (
        <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          {/* edge fades for polish */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* marquee: duplicate for seamless loop */}
          <div
            className="marquee flex items-stretch w-[200%] gap-4 will-change-transform"
            style={{ animation: `marquee ${marqueeDuration} linear infinite` }}
            aria-label="Running events carousel"
          >
            <TrackContent events={events} />
            <TrackContent events={events} ariaHidden />
          </div>

          {/* keyframes + hover pause + reduced motion */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .group:hover .marquee { animation-play-state: paused; }
              .group:focus-within .marquee { animation-play-state: paused; }
              @media (prefers-reduced-motion: reduce) {
                .marquee { animation: none !important; }
              }
            `,
            }}
          />
        </div>
      )}
    </section>
  )
}

function TrackContent({ events = [], ariaHidden = false }) {
  return (
    <div className="flex items-stretch gap-4 px-3" aria-hidden={ariaHidden ? "true" : undefined}>
      {events.map((event, idx) => (
        <article
          key={(event?._id || `${event?.title}-${idx}`) + (ariaHidden ? "-dup" : "")}
          className="w-56 md:w-64 shrink-0 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-400 ease-out hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="relative">
            <img
              src={event?.images?.[0] || "/default-event.jpg"}
              alt={event?.title || "Event image"}
              className="w-full h-32 md:h-36 object-cover transition-transform duration-700 ease-out hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            {/* hover gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="p-3">
            <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">
              {event?.title || "Untitled Event"}
            </h3>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs md:text-sm text-gray-600">
              <CalendarDays className="h-3.5 w-3.5 md:h-4 md:w-4 text-indigo-600" aria-hidden="true" />
              <span>{event?.date ? new Date(event.date).toDateString() : "Date TBA"}</span>
            </div>
            {event?.location && (
              <div className="mt-1 flex items-center gap-1.5 text-xs md:text-sm text-gray-600">
                <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 text-rose-600" aria-hidden="true" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

function TrackSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
      <div className="flex items-stretch gap-4 px-3 py-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-56 md:w-64 shrink-0 rounded-xl overflow-hidden border border-gray-100 shadow-sm animate-pulse bg-white"
          >
            <div className="h-32 md:h-36 bg-gray-200" />
            <div className="p-3">
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-3.5 w-1/2 bg-gray-200 rounded mb-1.5" />
              <div className="h-3.5 w-1/3 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent" />
    </div>
  )
}

export default RunningEvents
