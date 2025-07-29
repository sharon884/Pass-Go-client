import { useEffect, useState } from "react";
import { fetchLandingRunningEvents } from "../../services/general/landingServices";

const RunningEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchLandingRunningEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error loading landing events", error);
      }
    };

    loadEvents();
  }, []);

  return (
    <section className="p-6 md:p-12 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        This Week's Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No events this week.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={event.images?.[0] || "/default-event.jpg"}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">{new Date(event.date).toDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RunningEvents;
