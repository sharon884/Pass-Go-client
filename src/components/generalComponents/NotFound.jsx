"use client"
import { useEffect, useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()
  const wrapperRef = useRef(null)
  const [query, setQuery] = useState("")

  // Subtle parallax based on mouse position
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty("--mx", x.toFixed(3))
      el.style.setProperty("--my", y.toFixed(3))
    }
    el.addEventListener("mousemove", onMove)
    return () => el.removeEventListener("mousemove", onMove)
  }, [])

  const safeGoBack = () => {
    if (window.history.length > 1 && document.referrer !== "") {
      navigate(-1)
    } else {
      navigate("/")
    }
  }

  const onSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/events?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <main
      ref={wrapperRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0b1020] text-white"
      aria-label="Page not found"
    >
      {/* Floating Back Button */}
      <button
        onClick={safeGoBack}
        className="group fixed left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
        aria-label="Go back to the previous page"
      >
        <svg
          className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>

      {/* Animated background layers */}
      <div className="pointer-events-none absolute inset-0 notfound-bg" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 stars stars--1" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 stars stars--2" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 stars stars--3" aria-hidden="true" />

      {/* Comets */}
      <div
        className="pointer-events-none comet"
        style={{ animationDelay: "0s", top: "10%", left: "-15%" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none comet"
        style={{ animationDelay: "4s", top: "35%", left: "-20%" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none comet"
        style={{ animationDelay: "8s", top: "65%", left: "-25%" }}
        aria-hidden="true"
      />

      {/* Content */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-24 md:py-28">
        {/* 404 headline */}
        <div className="relative mb-6 select-none" role="img" aria-label="404">
          <div
            className="absolute -inset-10 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(80% 80% at 50% 50%, rgba(124,58,237,0.25) 0%, rgba(56,189,248,0.2) 40%, transparent 70%)",
            }}
          />
          <h1
            className="shine float-anim bg-gradient-to-r from-fuchsia-400 via-indigo-300 to-sky-400 bg-clip-text text-center text-[22vw] font-black leading-none text-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:text-[12rem]"
            style={{
              letterSpacing: "-0.08em",
              transform: "translate3d(calc(var(--mx,0)*8px), calc(var(--my,0)*8px), 0)",
            }}
          >
            404
          </h1>
        </div>

        <p className="mx-auto max-w-xl text-center text-base text-slate-300 md:text-lg">
          We couldn’t find that page. It might have been moved, renamed, or never existed.
        </p>

        {/* Actions */}
        <form onSubmit={onSearch} className="mt-8 flex w-full max-w-xl items-stretch gap-2">
          <label htmlFor="nf-search" className="sr-only">
            Search events
          </label>
          <input
            id="nf-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try searching events, places, artists..."
            className="flex-1 rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 transition focus:bg-white/10 focus:ring-2 focus:ring-sky-400/70"
            autoComplete="off"
          />
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:from-fuchsia-400 hover:to-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="group rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="group rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          >
            Explore Events
          </Link>
          <button
            onClick={safeGoBack}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          >
            Go Back
          </button>
          <a
            href="mailto:support@passgo.example?subject=Missing%20page&body=I%20hit%20a%20404%20on%20..."
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          >
            Report a problem
          </a>
        </div>

        {/* Helpful links */}
        <ul className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
          <li>
            <Link
              to="/user/profile"
              className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            >
              <p className="text-sm font-semibold text-white">Your Profile</p>
              <p className="text-xs text-slate-400">Manage your settings and tickets.</p>
            </Link>
          </li>
          <li>
            <Link
              to="/host-home-page"
              className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            >
              <p className="text-sm font-semibold text-white">Become a Host</p>
              <p className="text-xs text-slate-400">Create and manage your own events.</p>
            </Link>
          </li>
        </ul>
      </section>

      <style>{`
        /* Background */
        .notfound-bg{
          background:
            radial-gradient(1200px 600px at 10% -10%, rgba(124,58,237,0.25), transparent 60%),
            radial-gradient(1000px 500px at 110% 10%, rgba(56,189,248,0.18), transparent 60%),
            radial-gradient(800px 400px at 50% 120%, rgba(168,85,247,0.20), transparent 60%);
          transform: translate3d(calc(var(--mx,0)*10px), calc(var(--my,0)*10px), 0);
          transition: transform 120ms linear;
        }

        /* Stars using radial gradients */
        .stars{
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.9) 99%, transparent),
            radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.8) 99%, transparent),
            radial-gradient(1.5px 1.5px at 60% 50%, rgba(255,255,255,0.8) 99%, transparent),
            radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.8) 99%, transparent),
            radial-gradient(1px 1px at 10% 70%, rgba(255,255,255,0.9) 99%, transparent);
          background-repeat: repeat;
          background-size: 600px 600px;
          opacity: .55;
          will-change: transform, opacity;
          animation: twinkle 6s ease-in-out infinite;
        }
        .stars--1{ animation-duration: 7s; transform: translate3d(0,0,0) scale(1); }
        .stars--2{ animation-duration: 9s; transform: translate3d(0,0,0) scale(1.6); opacity: .45;}
        .stars--3{ animation-duration: 11s; transform: translate3d(0,0,0) scale(2.2); opacity: .35;}
        @keyframes twinkle {
          0%, 100% { opacity: .55; }
          50% { opacity: .85; }
        }

        /* Comet */
        .comet{
          position: absolute;
          width: 140px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.85) 40%, rgba(255,255,255,0) 100%);
          filter: drop-shadow(0 0 8px rgba(255,255,255,.7));
          transform: rotate(10deg);
          animation: comet 12s linear infinite;
        }
        @keyframes comet{
          0%{
            transform: translateX(-30vw) translateY(0) rotate(10deg);
            opacity: 0;
          }
          10%{ opacity: 1; }
          50%{
            transform: translateX(120vw) translateY(20vh) rotate(10deg);
            opacity: 1;
          }
          100%{
            transform: translateX(150vw) translateY(25vh) rotate(10deg);
            opacity: 0;
          }
        }

        /* 404 float + shine */
        .float-anim{
          animation: floatY 6s ease-in-out infinite;
        }
        @keyframes floatY{
          0%,100%{ transform: translate3d(calc(var(--mx,0)*8px), calc(var(--my,0)*8px),0) translateY(0); }
          50%{ transform: translate3d(calc(var(--mx,0)*8px), calc(var(--my,0)*8px),0) translateY(-10px); }
        }
        .shine{ position: relative; overflow: hidden; }
        .shine::after{
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 40%, rgba(255,255,255,.35) 50%, transparent 60%);
          mix-blend-mode: screen;
          transform: translateX(-120%) skewX(-12deg);
          animation: shineSweep 4.2s ease-in-out infinite 1s;
        }
        @keyframes shineSweep{
          0%, 10%{ transform: translateX(-120%) skewX(-12deg); }
          45%{ transform: translateX(120%) skewX(-12deg); }
          100%{ transform: translateX(120%) skewX(-12deg); }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce){
          .float-anim,
          .shine::after,
          .stars,
          .comet { animation: none !important; }
          .notfound-bg { transition: none !important; }
        }
      `}</style>
    </main>
  )
}
