const PassGoLogo = ({ size = "medium", animated = true, className = "", showText = true }) => {
  // Size configurations
  const sizeConfig = {
    small: {
      width: "120px",
      height: "40px",
      fontSize: "18px",
      iconSize: "32px",
      spacing: "8px",
    },
    medium: {
      width: "180px",
      height: "60px",
      fontSize: "28px",
      iconSize: "48px",
      spacing: "12px",
    },
    large: {
      width: "240px",
      height: "80px",
      fontSize: "36px",
      iconSize: "64px",
      spacing: "16px",
    },
    xl: {
      width: "300px",
      height: "100px",
      fontSize: "48px",
      iconSize: "80px",
      spacing: "20px",
    },
  }

  const config = sizeConfig[size] || sizeConfig.medium

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width: config.width,
        height: config.height,
        gap: config.spacing,
      }}
    >
      {/* PASS Text */}
      {showText && (
        <div
          className={`font-black tracking-wider select-none ${animated ? "transition-all duration-300 hover:scale-105" : ""}`}
          style={{
            fontSize: config.fontSize,
            background: "linear-gradient(135deg, #7454FD 0%, #00BFFF 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          PASS
        </div>
      )}

      {/* Ticket Icon */}
      <div
        className={`relative flex items-center justify-center ${animated ? "transition-all duration-300 hover:scale-110" : ""}`}
        style={{
          width: config.iconSize,
          height: config.iconSize,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="ticketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7454FD" />
              <stop offset="100%" stopColor="#00BFFF" />
            </linearGradient>
            <linearGradient id="ticketGradientBack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7454FD" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00BFFF" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>

          {/* Back Ticket (offset for depth) */}
          <g transform="translate(8, 6) rotate(5)">
            <path
              d="M8 8 L72 8 Q78 8 78 14 L78 28 Q73 28 73 34 Q73 40 78 40 L78 54 Q78 60 72 60 L8 60 Q2 60 2 54 L2 40 Q7 40 7 34 Q7 28 2 28 L2 14 Q2 8 8 8 Z"
              fill="url(#ticketGradientBack)"
              stroke="url(#strokeGradient)"
              strokeWidth="1.5"
            />
          </g>

          {/* Front Ticket */}
          <g>
            <path
              d="M8 12 L72 12 Q78 12 78 18 L78 32 Q73 32 73 38 Q73 44 78 44 L78 58 Q78 64 72 64 L8 64 Q2 64 2 58 L2 44 Q7 44 7 38 Q7 32 2 32 L2 18 Q2 12 8 12 Z"
              fill="url(#ticketGradient)"
              stroke="url(#strokeGradient)"
              strokeWidth="2"
            />

            {/* Star in center */}
            <g transform="translate(40, 38)">
              <path
                d="M0 -6 L1.8 -1.8 L6 -1.8 L2.4 1.2 L4.2 5.4 L0 3 L-4.2 5.4 L-2.4 1.2 L-6 -1.8 L-1.8 -1.8 Z"
                fill="white"
                className={animated ? "animate-pulse" : ""}
                style={{ animationDuration: "2s" }}
              />
            </g>

            {/* Ticket perforations */}
            <circle cx="2" cy="38" r="1.5" fill="white" />
            <circle cx="78" cy="38" r="1.5" fill="white" />

            {/* Additional perforation details */}
            <circle cx="2" cy="32" r="0.8" fill="white" opacity="0.6" />
            <circle cx="2" cy="44" r="0.8" fill="white" opacity="0.6" />
            <circle cx="78" cy="32" r="0.8" fill="white" opacity="0.6" />
            <circle cx="78" cy="44" r="0.8" fill="white" opacity="0.6" />
          </g>

          {/* Animated glow effect */}
          {animated && (
            <g className="animate-pulse" style={{ animationDuration: "3s" }}>
              <path
                d="M8 12 L72 12 Q78 12 78 18 L78 32 Q73 32 73 38 Q73 44 78 44 L78 58 Q78 64 72 64 L8 64 Q2 64 2 58 L2 44 Q7 44 7 38 Q7 32 2 32 L2 18 Q2 12 8 12 Z"
                fill="none"
                stroke="url(#ticketGradient)"
                strokeWidth="0.5"
                opacity="0.5"
                filter="blur(1px)"
              />
            </g>
          )}
        </svg>

        {/* Floating particles */}
        {animated && (
          <>
            <div
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{
                backgroundColor: "#7454FD",
                top: "10%",
                right: "10%",
                animationDuration: "2s",
              }}
            />
            <div
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{
                backgroundColor: "#00BFFF",
                bottom: "15%",
                left: "15%",
                animationDuration: "2.5s",
                animationDelay: "0.5s",
              }}
            />
          </>
        )}
      </div>

      {/* GO Text */}
      {showText && (
        <div
          className={`font-black tracking-wider select-none ${animated ? "transition-all duration-300 hover:scale-105" : ""}`}
          style={{
            fontSize: config.fontSize,
            background: "linear-gradient(135deg, #7454FD 0%, #00BFFF 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          GO
        </div>
      )}
    </div>
  )
}

export default PassGoLogo
