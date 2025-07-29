import React from "react";

const categories = [
  { name: "Music", image: "/music.png" },
  { name: "Art", image: "/art.png" },
  { name: "Fashion", image: "/fashion.jpg" },
  { name: "Motorsports", image: "/moto.jpg" },
];

const InfoSection = () => {
  return (
    <section className="flex flex-col md:flex-row gap-6 p-6 md:p-12 bg-gray-50">
      {/* Left Box: Features */}
      <div className="md:w-1/2 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Why Choose Pass-Go?</h2>
        
        <div className="space-y-6">
          {/* Platform Features */}
          <div>
            <h3 className="text-lg font-semibold mb-2">🚀 Platform Highlights</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>3-click ticket booking</li>
              <li>Easy to switch between user and host roles</li>
              <li>Real-time updates and booking confirmation</li>
            </ul>
          </div>

          {/* Host Features */}
          <div>
            <h3 className="text-lg font-semibold mb-2">🧑‍💼 For Hosts</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Low commission on ticket sales</li>
              <li>Advance payments before the event</li>
              <li>Full refund support system</li>
            </ul>
          </div>

          {/* User Features */}
          <div>
            <h3 className="text-lg font-semibold mb-2">🙋‍♂️ For Users</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Secure checkout process</li>
              <li>Scam prevention with verified hosts</li>
              <li>Get instant e-tickets & event alerts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Box: Categories */}
      <div className="md:w-1/2 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Explore by Category</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition transform duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-32 object-cover"
              />
              <div className="text-center py-2 font-semibold text-gray-800 bg-gray-100">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
