
import { useEffect, useRef, useState } from "react"

const ROTATE_MS = 8000 // slide duration

const LandingBanner = () => {
  const [textVisible, setTextVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null) // number | null
  const [showPrev, setShowPrev] = useState(false)
  const [loadedCurrent, setLoadedCurrent] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const [parallax, setParallax] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const sectionRef = useRef(null)

  // Public image paths (place these in /public)
  const IMAGES = [
    "/leo_visions-vFMIAG_udn0-unsplash.jpg",
    "/samantha-gades-fIHozNWfcvs-unsplash.jpg",
    "/paul-bJYcF9osDW0-unsplash.jpg",
    "/evangeline-shaw-nwLTVwb7DbU-unsplash.jpg",
  ]

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handle = () => setReducedMotion(mq.matches)
    handle()
    mq.addEventListener?.("change", handle)
    return () => mq.removeEventListener?.("change", handle)
  }, [])

  // Reveal text when section enters the viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTextVisible(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Parallax effect on scroll (gentle)
  useEffect(() => {
    if (reducedMotion) return
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        const progress = rect.top / window.innerHeight
        setParallax(progress * -16)
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [reducedMotion])

  // Smooth auto-rotation with a clip-path reveal (no dark "shade" overlap)
  useEffect(() => {
    if (reducedMotion || IMAGES.length < 2) return
    const id = setInterval(() => {
      const next = (current + 1) % IMAGES.length
      // Preload next to avoid flashes
      const pre = new Image()
      pre.crossOrigin = "anonymous"
      pre.src = IMAGES[next]
      pre.onload = () => {
        setPrev(current) // put current on top as overlay
        setShowPrev(true) // overlay starts fully covering
        setLoadedCurrent(false)
        setZoomed(false) // reset zoom for upcoming image
        setCurrent(next) // swap base image underneath
      }
      pre.onerror = () => {
        setPrev(current)
        setShowPrev(true)
        setLoadedCurrent(false)
        setZoomed(false)
        setCurrent(next)
      }
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [current, reducedMotion])

  // When the new image loads: fade it in, start slow zoom, then peel away overlay
  const handleCurrentLoad = () => {
    setLoadedCurrent(true)
    if (!reducedMotion) {
      requestAnimationFrame(() => setZoomed(true)) // start Ken Burns zoom
    }
    // After the current is visible, animate the overlay's clip-path to 0
    setTimeout(() => setShowPrev(false), 60)
  }

  return (
    <section ref={sectionRef} className="relative w-full h-[80vh] overflow-hidden">
      {/* Current Image (base layer) */}
      <img
        key={current}
        src={IMAGES[current] || "/placeholder.svg"}
        alt="Event Banner"
        onLoad={handleCurrentLoad}
        className={[
          "absolute inset-0 w-full h-full object-cover",
          // Contrast and smooth fade-in
          "brightness-75 transition-opacity ease-out",
          loadedCurrent ? "opacity-100 duration-700" : "opacity-0 duration-300",
          "will-change-transform",
        ].join(" ")}
        style={
          reducedMotion
            ? undefined
            : {
                transform: `translateY(${parallax}px) scale(${zoomed ? 1.12 : 1.06})`,
                transition: `transform ${Math.max(ROTATE_MS - 400, 1200)}ms ease-out`,
              }
        }
        loading="eager"
        decoding="async"
      />

      {/* Previous Image overlay (top layer that reveals away via clip-path, not opacity) */}
      {prev !== null && (
        <img
          key={`prev-${prev}-${current}`}
          src={IMAGES[prev] || "/placeholder.svg"}
          alt=""
          aria-hidden="true"
          className={[
            "absolute inset-0 w-full h-full object-cover pointer-events-none",
            // Keep it at full opacity; animate clip-path so the new image is revealed without double-dark overlap
            "transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            "will-change-[clip-path]",
          ].join(" ")}
          style={
            reducedMotion
              ? undefined
              : {
                  // Match parallax for perfect alignment
                  transform: `translateY(${parallax}px) scale(1.06)`,
                  // Start fully covering, then shrink to a small circle to reveal new image underneath
                  clipPath: showPrev ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
                }
          }
        />
      )}

      {/* Contrast gradient overlay to keep text readable (lighter than before) */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
        <h1
          className={[
            "text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-md tracking-tight",
            "transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu",
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          ].join(" ")}
        >
          Experience Events, Effortlessly
        </h1>
        <p
          className={[
            "text-base sm:text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md text-white/90",
            "transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu delay-150",
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          ].join(" ")}
        >
          Discover, host, and enjoy memorable moments with Pass-Go — your smoothest path to tickets.
        </p>
        {/* Scroll hint removed */}
      </div>
    </section>
  )
}

export default LandingBanner
