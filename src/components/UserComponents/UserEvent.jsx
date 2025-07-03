"use client";
import { useEffect, useState } from "react";
import api from "../../utils/api/api";
import { Link } from "react-router-dom";
import { fetchApproveEvents } from "../../services/user/userEventServices";

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = async (page = 1) => {
    try {
      const data = await fetchApproveEvents(page, 6);
      setEvents(data.events);
      setTotalPages(data.totalPages);
      setPage(data.page);

      const initialImageIndices = {};
      data.events.forEach((event) => {
        initialImageIndices[event._id] = 0;
      });
      setCurrentImageIndex(initialImageIndices);
    } catch (error) {
      console.log("events fetching error", error);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (events.length > 0) {
        setCurrentImageIndex((prevIndices) => {
          const newIndices = { ...prevIndices };

          events.forEach((event) => {
            if (event.images && event.images.length > 1) {
              newIndices[event._id] =
                (prevIndices[event._id] + 1) % event.images.length;
            }
          });

          return newIndices;
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [events]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  // {
  //   !loading && events.length === 0 && (
  //     <div className="col-span-full text-center text-gray-500 py-10">
  //       No events available right now. Check back later!
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] to-white p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Link
          to={`/your-event/${event._id}`}
          key={event._id}
          className="block group"
        >
          <div className="bg-white rounded-[18px] overflow-hidden transition-all duration-300 border border-[#E8ECEF] group-hover:border-[#7454FD]/30 group-hover:shadow-lg">
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              {event.images &&
                event.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={event.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      index === currentImageIndex[event._id]
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  />
                ))}

              {/* Gradient carousel indicators */}
              {event.images && event.images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                  {event.images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex[event._id]
                          ? "w-6 shadow-sm"
                          : "w-1.5 bg-white/60 hover:bg-white/80"
                      }`}
                      style={{
                        background:
                          index === currentImageIndex[event._id]
                            ? "linear-gradient(to right, #7454FD, #00BFFF)"
                            : undefined,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Gradient category tag */}
              <div className="absolute top-4 left-4">
                <span
                  className="text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{
                    background: "linear-gradient(to right, #7454FD, #00BFFF)",
                  }}
                >
                  🎫 {event.category}
                </span>
              </div>
              {/* Below category badge */}
              <div>
                <span
                  className="ml-2 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{
                    background:
                      event.eventType === "free"
                        ? "linear-gradient(to right, #34D399, #10B981)"
                        : "linear-gradient(to right, #F59E0B, #F97316)",
                  }}
                >
                  {event.eventType === "free" ? "Free" : "Paid"}
                </span>
                {event.eventType === "paid_stage_with_seats" && (
                  <span className="text-xs text-gray-500 ml-2">
                    🎭 Reserved Seating
                  </span>
                )}
              </div>

              {/* Subtle overlay with brand colors */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(116,84,253,0.1) 100%)",
                }}
              ></div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-800 group-hover:text-[#7454FD] transition-colors duration-200">
                {event.title}
              </h2>

              <div className="flex items-center mb-4 text-gray-500">
                <svg
                  className="w-4 h-4 mr-2 text-[#00BFFF]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-medium">{formatDate(event.date)}</p>
              </div>

              {/* Gradient button */}
              <button
                className="w-full text-white font-medium py-3 px-6 rounded-full transition-all duration-200 text-sm hover:shadow-lg transform hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(to right, #7454FD, #00BFFF)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background =
                    "linear-gradient(to right, #6366f1, #0ea5e9)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background =
                    "linear-gradient(to right, #7454FD, #00BFFF)";
                }}
              >
                View Details
              </button>
            </div>
          </div>
        </Link>
      ))}

      {/* Gradient pagination */}
      <div className="flex justify-center items-center gap-4 mt-12 col-span-full">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 flex items-center ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "text-white hover:shadow-lg transform hover:scale-[1.02]"
          }`}
          style={{
            background:
              page === 1
                ? undefined
                : "linear-gradient(to right, #7454FD, #00BFFF)",
          }}
          onMouseEnter={(e) => {
            if (page !== 1) {
              e.target.style.background =
                "linear-gradient(to right, #6366f1, #0ea5e9)";
            }
          }}
          onMouseLeave={(e) => {
            if (page !== 1) {
              e.target.style.background =
                "linear-gradient(to right, #7454FD, #00BFFF)";
            }
          }}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        <div className="px-4 py-2 bg-white rounded-full border border-[#E8ECEF] shadow-sm">
          <span className="text-sm font-medium text-gray-700">
            Page <span style={{ color: "#7454FD" }}>{page}</span> of{" "}
            <span style={{ color: "#00BFFF" }}>{totalPages}</span>
          </span>
        </div>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 flex items-center ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "text-white hover:shadow-lg transform hover:scale-[1.02]"
          }`}
          style={{
            background:
              page === totalPages
                ? undefined
                : "linear-gradient(to right, #7454FD, #00BFFF)",
          }}
          onMouseEnter={(e) => {
            if (page !== totalPages) {
              e.target.style.background =
                "linear-gradient(to right, #6366f1, #0ea5e9)";
            }
          }}
          onMouseLeave={(e) => {
            if (page !== totalPages) {
              e.target.style.background =
                "linear-gradient(to right, #7454FD, #00BFFF)";
            }
          }}
        >
          Next
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserEvents;
