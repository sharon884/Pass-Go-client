// src/components/LandingBanner.jsx

import React from "react";

const LandingBanner = () => {
  return (
    <section className="relative w-full h-[80vh]">
      {/* Banner Image */}
      <img
        src="/leo_visions-vFMIAG_udn0-unsplash.jpg"
        alt="Event Banner"
        className="w-full h-full object-cover brightness-75"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-md">
          Turning Moments Into Memories
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl drop-shadow-md">
          Discover, host, and enjoy events like never before with Pass-Go.
        </p>
      </div>
    </section>
  );
};

export default LandingBanner;
