import { useEffect, useState } from "react";

const images = [
  "/leo_visions-vFMIAG_udn0-unsplash.jpg",
  "/paul-bJYcF9osDW0-unsplash.jpg",
  "/samantha-gades-fIHozNWfcvs-unsplash.jpg",
];

const SlideshowBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // change image every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Images (only show current) */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
          Turning Moments Into Memories
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl drop-shadow-md">
          Discover, host, and enjoy events like never before with Pass-Go.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg text-white font-semibold transition">
          Explore Events
        </button>
      </div>

      {/* Optional Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default SlideshowBanner;
