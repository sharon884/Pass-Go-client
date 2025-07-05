"use client"

const TicketButton = ({ label = "View Details", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-xl transition-all duration-300 overflow-visible group transform hover:scale-105 hover:-translate-y-0.5 w-full max-w-[220px] mx-auto rounded"
    >
      <div className="flex items-center justify-center relative px-3 py-2">
        <div className="text-center relative">
          <div className="text-sm font-semibold group-hover:text-blue-100 transition-colors duration-300 whitespace-nowrap">
            {label}
          </div>
        </div>
      </div>

      {/* Center dashed perforation line */}
      <div className="absolute left-1/2 top-1.5 bottom-1.5 w-px border-l border-dashed border-white/50 -translate-x-1/2"></div>

      {/* Realistic, deeper ticket side notches */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-gray-100 rounded-r-full -translate-x-[6px]"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-gray-100 rounded-l-full translate-x-[6px]"></div>

      {/* Torn corner effect - small, subtle */}
      <div
        className="absolute top-0 left-0 w-2 h-2 bg-blue-600 group-hover:bg-blue-700 transition-colors duration-300"
        style={{ clipPath: "polygon(0% 0%, 80% 0%, 60% 40%, 40% 60%, 0% 80%)" }}
      />
      <div
        className="absolute top-0 right-0 w-2 h-2 bg-blue-600 group-hover:bg-blue-700 transition-colors duration-300"
        style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 80%, 60% 60%, 40% 40%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-2 h-2 bg-blue-600 group-hover:bg-blue-700 transition-colors duration-300"
        style={{ clipPath: "polygon(0% 20%, 40% 40%, 60% 60%, 80% 100%, 0% 100%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-2 h-2 bg-blue-600 group-hover:bg-blue-700 transition-colors duration-300"
        style={{ clipPath: "polygon(40% 40%, 60% 60%, 100% 20%, 100% 100%, 20% 100%)" }}
      />

      {/* Hover glow */}
      <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded blur-sm -z-10"></div>

      {/* Subtle pulse gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-300/20 to-blue-500/0 opacity-0 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
    </button>
  )
}

export default TicketButton
