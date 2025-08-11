
import { useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
// Adjust this import path to where your SearchBar is located (you said you'll handle paths)
import SearchBar from "../UserComponents/Search/UserSearchBar";

export default function NotFound() {
  const navigate = useNavigate()
  const wrapperRef = useRef(null)

  // Subtle parallax based on mouse position
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5 // -0.5..0.5
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

  return (
    <main
      ref={wrapperRef}
      className="relative min-h-screen w-full overflow-hidden bg-white text-gray-900"
      aria-label="Page not found"
    >
      {/* Floating Back Button */}
      <button
        onClick={safeGoBack}
        className="group fixed left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/70"
        aria-label="Go back to the previous page"
      >
        <svg
          className="h-4 w-4 text-gray-600 transition-transform group-hover:-translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-gray-700">Back</span>
      </button>

      {/* Light animated background layers */}
      <div className="pointer-events-none absolute inset-0 notfound-bg-light" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 dots dots--1" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 dots dots--2" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 dots dots--3" aria-hidden="true" />

      {/* Content */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-24 md:py-28">
        {/* 404 headline */}
        <div className="relative mb-6 select-none" role="img" aria-label="404">
          <div
            className="absolute -inset-10 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(80% 80% at 50% 50%, rgba(124,58,237,0.18) 0%, rgba(56,189,248,0.14) 40%, transparent 70%)",
            }}
          />
          <h1
            className="shine float-anim bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-500 bg-clip-text text-center text-[22vw] font-black leading-none text-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:text-[12rem]"
            style={{
              letterSpacing: "-0.08em",
              transform: "translate3d(calc(var(--mx,0)*6px), calc(var(--my,0)*6px), 0)",
            }}
          >
            404
          </h1>
        </div>

        <p className="mx-auto max-w-xl text-center text-base text-gray-600 md:text-lg">
          We couldn’t find that page. It might have been moved, renamed, or never existed.
        </p>

        {/* Your working SearchBar component */}
        <div className="mt-8 w-full max-w-xl">
          <SearchBar />
        </div>

        {/* Primary actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="group rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          >
            Home
          </Link>

          {/* Use your protected Explore Events route */}
          <Link
            to="/user/events"
            className="group rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
          >
            Explore Events
          </Link>
        </div>

        {/* Helpful links */}
        <ul className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
          <li>
            <Link
              to="/user/profile"
              className="block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            >
              <p className="text-sm font-semibold text-gray-900">Your Profile</p>
              <p className="text-xs text-gray-500">Manage your settings and tickets.</p>
            </Link>
          </li>
          <li>
            <Link
              to="/host"
              className="block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            >
              <p className="text-sm font-semibold text-gray-900">Become a Host</p>
              <p className="text-xs text-gray-500">Create and manage your own events.</p>
            </Link>
          </li>
        </ul>
      </section>

      {/* Styles */}
      <style>{`
        /* Light background with subtle parallax */
        .notfound-bg-light{
          background:
            radial-gradient(1200px 600px at 10% -10%, rgba(124,58,237,0.10), transparent 60%),
            radial-gradient(1000px 500px at 110% 10%, rgba(56,189,248,0.08), transparent 60%),
            radial-gradient(800px 400px at 50% 120%, rgba(168,85,247,0.10), transparent 60%);
          transform: translate3d(calc(var(--mx,0)*8px), calc(var(--my,0)*8px), 0);
          transition: transform 120ms linear;
        }

        /* Soft dotted layers for light theme */
        .dots{
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(0,0,0,0.25) 99%, transparent),
            radial-gradient(1px 1px at 40% 80%, rgba(0,0,0,0.2) 99%, transparent),
            radial-gradient(1.5px 1.5px at 60% 50%, rgba(0,0,0,0.18) 99%, transparent),
            radial-gradient(1px 1px at 80% 20%, rgba(0,0,0,0.18) 99%, transparent),
            radial-gradient(1px 1px at 10% 70%, rgba(0,0,0,0.22) 99%, transparent);
          background-repeat: repeat;
          background-size: 600px 600px;
          opacity: .25;
          will-change: transform, opacity;
          animation: twinkleLight 7s ease-in-out infinite;
        }
        .dots--1{ animation-duration: 7s; transform: translate3d(0,0,0) scale(1); }
        .dots--2{ animation-duration: 10s; transform: translate3d(0,0,0) scale(1.6); opacity: .20;}
        .dots--3{ animation-duration: 13s; transform: translate3d(0,0,0) scale(2.2); opacity: .16;}
        @keyframes twinkleLight {
          0%, 100% { opacity: .22; }
          50% { opacity: .3; }
        }

        /* Floating 404 + subtle shine */
        .float-anim{
          animation: floatY 6s ease-in-out infinite;
        }
        @keyframes floatY{
          0%,100%{ transform: translate3d(calc(var(--mx,0)*6px), calc(var(--my,0)*6px),0) translateY(0); }
          50%{ transform: translate3d(calc(var(--mx,0)*6px), calc(var(--my,0)*6px),0) translateY(-10px); }
        }
        .shine{ position: relative; overflow: hidden; }
        .shine::after{
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 40%, rgba(255,255,255,.6) 50%, transparent 60%);
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
          .dots { animation: none !important; }
          .notfound-bg-light { transition: none !important; }
        }
      `}</style>
    </main>
  )
}
