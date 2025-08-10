import { Rocket, Ticket, BadgeDollarSign, ShieldCheck } from "lucide-react"

const items = [
  { icon: Rocket, text: "PassGo – 500+ Active Users" },
  { icon: Ticket, text: "200+ Events Hosted" },
  { icon: BadgeDollarSign, text: "100% Refund Guarantee" },
  { icon: ShieldCheck, text: "Secure Booking Experience" },
]

const PassGoStrip = () => {
  return (
    <div
      className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 border-y border-white/10 py-2"
      aria-label="PassGo highlights"
    >
      {/* Fade edges for a professional look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-indigo-700 to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-indigo-700 to-transparent opacity-80" />

      {/* Marquee track (duplicated content for seamless loop) */}
      <div className="relative">
        <div
          className="marquee flex items-center whitespace-nowrap will-change-transform"
          style={{ animation: "marquee 24s linear infinite" }}
        >
          {/* pass 1 */}
          <StripContent />
          {/* pass 2 (duplicate for seamless loop) */}
          <StripContent ariaHidden />
        </div>
      </div>

      {/* Inline keyframes + hover pause + reduced motion + shine effect */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          /* Subtle text shine on hover */
          @keyframes shine {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .group:hover .marquee {
            animation-play-state: paused;
          }
          /* Shine only when hovering an item (keeps normal text otherwise) */
          .item:hover .label {
            color: transparent;
            background-image: linear-gradient(
              90deg,
              rgba(255,255,255,0.85),
              rgba(255,255,255,1),
              rgba(255,255,255,0.85)
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shine 1.6s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee { animation: none !important; }
            .item:hover .label { animation: none !important; }
          }
        `,
        }}
      />
    </div>
  )
}

function StripContent({ ariaHidden = false }) {
  return (
    <div
      className="flex items-center text-white/95 text-sm md:text-base font-semibold tracking-wide pr-16"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {items.map(({ icon: Icon, text }, idx) => (
        <span
          key={`${text}-${idx}`}
          className="item mx-8 inline-flex items-center gap-2 md:gap-3 py-1.5 px-2 rounded-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <Icon
            className="h-4 w-4 md:h-5 md:w-5 text-white/90 transition-transform duration-300 ease-out drop-shadow-[0_1px_6px_rgba(0,0,0,0.2)] group-hover:drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
            aria-hidden="true"
          />
          <span className="label">{text}</span>
        </span>
      ))}
    </div>
  )
}

export default PassGoStrip
