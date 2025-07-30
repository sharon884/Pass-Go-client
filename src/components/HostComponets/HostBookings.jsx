"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "../../contexts/ThemeContext";
import { getHostEventBookings } from "../../services/host/hostAnalyticsServices";
import {
  addOffer,
  cancelOffer,
} from "../../services/host/hostEventOfferServices";
import AddOfferModal from "./AddOfferModal";
import CancelEventModal from "../../components/HostComponets/Modals/CancelEventModal";

const HostEventAnalytics = () => {
  const { eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [cancellingOffer, setCancellingOffer] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  const [animatedCards, setAnimatedCards] = useState({});
  const { currentTheme, theme } = useTheme();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Enhanced theme styles with gradients and animations
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        mainBg: "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50",
        cardBg: "bg-white/80 backdrop-blur-sm",
        textPrimary: "text-slate-900",
        textSecondary: "text-slate-700",
        textMuted: "text-slate-500",
        borderColor: "border-slate-200/60",
        hoverBg: "hover:bg-slate-50/80",
        accentBg: "bg-gradient-to-r from-blue-50 to-indigo-50",
        successBg: "bg-gradient-to-r from-emerald-50 to-green-50",
        warningBg: "bg-gradient-to-r from-amber-50 to-yellow-50",
        dangerBg: "bg-gradient-to-r from-red-50 to-rose-50",
        primaryGradient: "bg-gradient-to-r from-blue-600 to-indigo-600",
        successGradient: "bg-gradient-to-r from-emerald-500 to-green-500",
        warningGradient: "bg-gradient-to-r from-amber-500 to-yellow-500",
      };
    } else {
      return {
        mainBg: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
        cardBg: "bg-slate-800/80 backdrop-blur-sm",
        textPrimary: "text-white",
        textSecondary: "text-slate-200",
        textMuted: "text-slate-400",
        borderColor: "border-slate-700/60",
        hoverBg: "hover:bg-slate-700/80",
        accentBg: "bg-gradient-to-r from-slate-800 to-purple-800",
        successBg: "bg-gradient-to-r from-emerald-900 to-green-900",
        warningBg: "bg-gradient-to-r from-amber-900 to-yellow-900",
        dangerBg: "bg-gradient-to-r from-red-900 to-rose-900",
        primaryGradient: "bg-gradient-to-r from-purple-600 to-indigo-600",
        successGradient: "bg-gradient-to-r from-emerald-600 to-green-600",
        warningGradient: "bg-gradient-to-r from-amber-600 to-yellow-600",
      };
    }
  };

  const styles = getThemeStyles();

  // Animation helper
  const animateCard = (cardId) => {
    setAnimatedCards((prev) => ({ ...prev, [cardId]: true }));
    setTimeout(() => {
      setAnimatedCards((prev) => ({ ...prev, [cardId]: false }));
    }, 600);
  };

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await getHostEventBookings(eventId);
      if (res.success) {
        setSummary(res.data);
        // Animate cards on data load
        setTimeout(() => animateCard("metrics"), 100);
        setTimeout(() => animateCard("tickets"), 200);
        setTimeout(() => animateCard("calendar"), 300);
      } else {
        toast.error(res.message || "Failed to load event summary");
      }
    } catch (err) {
      toast.error("Something went wrong fetching summary");
    }
    setLoading(false);
  };

  const handleCancelOffer = async () => {
    setCancellingOffer(true);
    try {
      const res = await cancelOffer(eventId);
      if (res.success) {
        toast.success("Offer canceled successfully");
        fetchSummary();
        animateCard("offer");
      } else {
        toast.error(res.message || "Failed to cancel offer");
      }
    } catch (err) {
      toast.error("Error while cancelling the offer");
    }
    setCancellingOffer(false);
  };

  const handleAddOffer = async (offerData) => {
    try {
      const res = await addOffer(eventId, offerData);
      if (res.success) {
        toast.success("Offer added successfully");
        fetchSummary();
        setShowAddOfferModal(false);
        animateCard("offer");
      } else {
        toast.error(res.message || "Failed to add offer");
      }
    } catch (err) {
      toast.error("Error while adding the offer");
    }
  };

  // Calendar functions (keeping existing logic)
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getSalesForDate = (date) => {
    if (!summary?.dailySales) return 0;
    const dateStr = date.toISOString().split("T")[0];
    const sale = summary.dailySales.find((sale) => {
      const saleDate = new Date(sale._id + "T00:00:00.000Z")
        .toISOString()
        .split("T")[0];
      return saleDate === dateStr;
    });
    return sale ? sale.count : 0;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const getFilteredTicketStats = () => {
    if (!summary?.ticketStats) {
      return {
        VIP: { sold: 5, total: 90, remaining: 85 },
        General: { sold: 1, total: 90, remaining: 89 },
      };
    }
    const filtered = {};
    Object.entries(summary.ticketStats).forEach(([category, stats]) => {
      const lowerCategory = category.toLowerCase();
      if (lowerCategory.includes("vip") || lowerCategory.includes("general")) {
        filtered[category] = stats;
      }
    });
    if (Object.keys(filtered).length === 0) {
      return {
        VIP: { sold: 5, total: 90, remaining: 85 },
        General: { sold: 1, total: 90, remaining: 89 },
      };
    }
    return filtered;
  };

  useEffect(() => {
    fetchSummary();
  }, [eventId]);

  if (loading) {
    return (
      <div className={`min-h-screen ${styles.mainBg} p-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {/* Animated loading skeleton */}
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-white/20 rounded-2xl w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-32 bg-white/20 rounded-2xl animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  ></div>
                ))}
              </div>
              <div className="h-96 bg-white/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div
        className={`min-h-screen ${styles.mainBg} flex items-center justify-center p-8`}
      >
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 opacity-60">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className={styles.textMuted}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className={`text-2xl font-bold ${styles.textPrimary} mb-2`}>
            No Event Data
          </h3>
          <p className={styles.textMuted}>
            Unable to load event analytics at this time.
          </p>
        </div>
      </div>
    );
  }

  const { event, ticketsSold, totalRevenue, dailySales, offer } = summary;
  const filteredTicketStats = getFilteredTicketStats();

  return (
    <div className={`min-h-screen ${styles.mainBg} p-4 sm:p-6 lg:p-8`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Floating Header with Tabs */}
        <div
          className={`${styles.cardBg} rounded-3xl shadow-xl border ${styles.borderColor} p-8 
                        transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h1
                className={`text-4xl font-bold ${styles.textPrimary} mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
              >
                {event.title}
              </h1>
              <p className={`${styles.textSecondary} text-lg`}>
                {event.description}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className={`px-6 py-3 rounded-2xl ${styles.primaryGradient} text-white font-semibold
                                transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95
                                flex items-center gap-2`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Event
              </button>
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold 
             transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 
             flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Request Cancellation
              </button>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="flex gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "analytics", label: "Analytics", icon: "📈" },
              { id: "offers", label: "Offers", icon: "🎫" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2
                          ${
                            activeTab === tab.id
                              ? `${styles.primaryGradient} text-white shadow-lg transform scale-105`
                              : `${styles.textMuted} hover:bg-white/50 dark:hover:bg-slate-700/50`
                          }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Metrics Cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 
                        ${animatedCards.metrics ? "animate-bounce" : ""}`}
        >
          {[
            {
              label: "Tickets Sold",
              value: "6",
              icon: "🎫",
              color: "from-blue-500 to-cyan-500",
              bg: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              label: "Total Revenue",
              value: "₹625.4",
              icon: "💰",
              color: "from-emerald-500 to-green-500",
              bg: "bg-emerald-50 dark:bg-emerald-900/20",
            },
            {
              label: "VIP Tickets",
              value: "5",
              icon: "⭐",
              color: "from-purple-500 to-pink-500",
              bg: "bg-purple-50 dark:bg-purple-900/20",
            },
            {
              label: "General Tickets",
              value: "1",
              icon: "👥",
              color: "from-orange-500 to-red-500",
              bg: "bg-orange-50 dark:bg-orange-900/20",
            },
          ].map((metric, index) => (
            <div
              key={metric.label}
              className={`${styles.cardBg} rounded-2xl shadow-lg border ${styles.borderColor} p-6
                           transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-2
                           ${metric.bg} group cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => animateCard("metrics")}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${metric.color} 
                               flex items-center justify-center text-2xl transform transition-transform 
                               group-hover:rotate-12 group-hover:scale-110`}
                >
                  {metric.icon}
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm ${styles.textMuted} uppercase tracking-wider font-medium`}
                  >
                    {metric.label}
                  </p>
                  <p
                    className={`text-3xl font-bold ${styles.textPrimary} mt-1 group-hover:scale-110 transition-transform`}
                  >
                    {metric.value}
                  </p>
                </div>
              </div>
              <div
                className={`h-2 bg-gradient-to-r ${metric.color} rounded-full opacity-20 group-hover:opacity-40 transition-opacity`}
              ></div>
            </div>
          ))}
        </div>

        {/* Enhanced Ticket Categories with Animations */}
        <div
          className={`${styles.cardBg} rounded-3xl shadow-xl border ${
            styles.borderColor
          } p-8
                        ${animatedCards.tickets ? "animate-pulse" : ""}`}
        >
          <h3
            className={`text-2xl font-bold ${styles.textPrimary} mb-8 flex items-center gap-3`}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <span className="text-xl">🎭</span>
            </div>
            Ticket Performance
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(filteredTicketStats).map(
              ([category, stats], index) => {
                const percentage =
                  stats.total > 0 ? (stats.sold / stats.total) * 100 : 0;
                const isVip = category.toLowerCase().includes("vip");
                const gradientColor = isVip
                  ? "from-purple-500 to-pink-500"
                  : "from-orange-500 to-red-500";

                return (
                  <div
                    key={category}
                    className={`p-8 rounded-2xl border-2 ${styles.borderColor} 
                               transform transition-all duration-500 hover:scale-105 hover:shadow-xl
                               bg-gradient-to-br ${
                                 isVip
                                   ? "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                                   : "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
                               }
                               group cursor-pointer`}
                    style={{ animationDelay: `${index * 200}ms` }}
                    onClick={() => animateCard("tickets")}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${gradientColor} rounded-2xl 
                                     flex items-center justify-center text-2xl transform transition-transform 
                                     group-hover:rotate-12 group-hover:scale-110`}
                        >
                          {isVip ? "⭐" : "👥"}
                        </div>
                        <div>
                          <h4
                            className={`text-xl font-bold ${styles.textPrimary}`}
                          >
                            {category}
                          </h4>
                          <p className={`${styles.textMuted} text-sm`}>
                            Category Performance
                          </p>
                        </div>
                      </div>
                      <div
                        className={`text-3xl font-bold bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}
                      >
                        {percentage.toFixed(1)}%
                      </div>
                    </div>

                    {/* Animated Progress Ring */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <svg
                        className="w-32 h-32 transform -rotate-90"
                        viewBox="0 0 120 120"
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          strokeWidth="8"
                          className={`${
                            isVip ? "text-purple-500" : "text-orange-500"
                          } transition-all duration-1000`}
                          strokeDasharray={`${percentage * 3.14} 314`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold ${styles.textPrimary}`}
                          >
                            {stats.sold}
                          </div>
                          <div className={`text-xs ${styles.textMuted}`}>
                            sold
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div
                          className={`text-lg font-bold ${styles.textPrimary}`}
                        >
                          {stats.sold}
                        </div>
                        <div
                          className={`text-xs ${styles.textMuted} uppercase tracking-wide`}
                        >
                          Sold
                        </div>
                      </div>
                      <div>
                        <div
                          className={`text-lg font-bold ${styles.textPrimary}`}
                        >
                          {stats.total}
                        </div>
                        <div
                          className={`text-xs ${styles.textMuted} uppercase tracking-wide`}
                        >
                          Total
                        </div>
                      </div>
                      <div>
                        <div
                          className={`text-lg font-bold ${styles.textPrimary}`}
                        >
                          {stats.remaining}
                        </div>
                        <div
                          className={`text-xs ${styles.textMuted} uppercase tracking-wide`}
                        >
                          Left
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Enhanced Calendar with 3D Effects */}
        <div
          className={`${styles.cardBg} rounded-3xl shadow-xl border ${
            styles.borderColor
          } p-8
                        ${animatedCards.calendar ? "animate-pulse" : ""}`}
        >
          <h3
            className={`text-2xl font-bold ${styles.textPrimary} mb-8 flex items-center gap-3`}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
            Sales Calendar
            {selectedDate && (
              <span
                className={`text-lg ${styles.textMuted} ml-4 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-xl`}
              >
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                : {getSalesForDate(selectedDate)} tickets
              </span>
            )}
          </h3>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigateMonth(-1)}
              className={`p-4 rounded-2xl ${styles.cardBg} border ${styles.borderColor} 
                              transform transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95
                              ${styles.hoverBg}`}
            >
              <svg
                className={`w-6 h-6 ${styles.textPrimary}`}
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
            </button>

            <h4
              className={`text-2xl font-bold ${styles.textPrimary} px-6 py-3 rounded-2xl ${styles.accentBg}`}
            >
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h4>

            <button
              onClick={() => navigateMonth(1)}
              className={`p-4 rounded-2xl ${styles.cardBg} border ${styles.borderColor} 
                              transform transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95
                              ${styles.hoverBg}`}
            >
              <svg
                className={`w-6 h-6 ${styles.textPrimary}`}
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

          {/* Enhanced Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className={`p-4 text-center text-sm font-bold ${styles.textMuted} uppercase tracking-wider`}
              >
                {day}
              </div>
            ))}

            {(() => {
              const daysInMonth = getDaysInMonth(currentMonth);
              const firstDay = getFirstDayOfMonth(currentMonth);
              const days = [];

              // Empty cells
              for (let i = 0; i < firstDay; i++) {
                days.push(<div key={`empty-${i}`} className="p-4"></div>);
              }

              // Calendar days with enhanced styling
              for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                );
                const salesCount = getSalesForDate(date);
                const isSelected = isSameDate(date, selectedDate);
                const isTodayDate = isToday(date);

                let buttonClass = `p-4 text-sm rounded-2xl transition-all duration-300 relative ${styles.textPrimary} 
                                 transform hover:scale-110 hover:shadow-lg active:scale-95 font-semibold`;

                if (isTodayDate) {
                  buttonClass += ` bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg`;
                } else if (isSelected) {
                  buttonClass += ` bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg`;
                } else if (salesCount > 0) {
                  buttonClass += ` bg-gradient-to-r from-orange-200 to-yellow-200 dark:from-orange-800 dark:to-yellow-800 hover:from-orange-300 hover:to-yellow-300`;
                } else {
                  buttonClass += ` ${styles.cardBg} border ${styles.borderColor} ${styles.hoverBg}`;
                }

                days.push(
                  <button
                    key={day}
                    onClick={() => setSelectedDate(date)}
                    className={buttonClass}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-lg">{day}</span>
                      {salesCount > 0 && (
                        <div
                          className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 
                                       text-white text-xs rounded-full w-6 h-6 flex items-center justify-center 
                                       font-bold shadow-lg animate-pulse"
                        >
                          {salesCount}
                        </div>
                      )}
                    </div>
                  </button>
                );
              }
              return days;
            })()}
          </div>

          {/* Enhanced Legend */}
          <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            {[
              { label: "Today", color: "from-green-500 to-emerald-500" },
              { label: "Sales Day", color: "from-orange-400 to-yellow-400" },
              { label: "Selected", color: "from-blue-500 to-purple-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 bg-gradient-to-r ${item.color} rounded-full shadow-sm`}
                ></div>
                <span className={`text-sm ${styles.textMuted} font-medium`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Offer Management */}
        <div
          className={`${styles.cardBg} rounded-3xl shadow-xl border ${
            styles.borderColor
          } p-8
                        ${animatedCards.offer ? "animate-bounce" : ""}`}
        >
          <h3
            className={`text-2xl font-bold ${styles.textPrimary} mb-8 flex items-center gap-3`}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <span className="text-xl">🎁</span>
            </div>
            Offer Management
          </h3>

          {offer ? (
            <div
              className={`${styles.successBg} border-2 border-green-200 dark:border-green-700 rounded-2xl p-8
                           transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl 
                                   flex items-center justify-center text-2xl animate-pulse"
                    >
                      ✅
                    </div>
                    <div>
                      <h4
                        className={`text-2xl font-bold ${styles.textPrimary}`}
                      >
                        Active Offer
                      </h4>
                      <p className={`${styles.textSecondary}`}>
                        Your promotional offer is live!
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                      {
                        label: "Discount Type",
                        value: offer.discountType,
                        icon: "🏷️",
                      },
                      {
                        label: "Discount Value",
                        value:
                          offer.discountType === "percentage"
                            ? `${offer.value}%`
                            : `₹${offer.value}`,
                        icon: "💸",
                      },
                      {
                        label: "Expires On",
                        value: new Date(offer.expiryDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        ),
                        icon: "⏰",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`p-6 rounded-2xl ${styles.cardBg} border ${styles.borderColor}
                                                       transform transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{item.icon}</span>
                          <p
                            className={`text-sm ${styles.textMuted} uppercase tracking-wider font-medium`}
                          >
                            {item.label}
                          </p>
                        </div>
                        <p
                          className={`text-xl font-bold ${styles.textPrimary} capitalize`}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleCancelOffer}
                    disabled={cancellingOffer}
                    className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 
                                   disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl 
                                   font-bold text-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105 active:scale-95
                                   flex items-center gap-3"
                  >
                    {cancellingOffer ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Cancelling...
                      </>
                    ) : (
                      <>
                        <span className="text-xl">🗑️</span>
                        Cancel Offer
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`${styles.warningBg} border-2 border-yellow-200 dark:border-yellow-700 rounded-2xl p-8
                           transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
            >
              <div className="text-center">
                <div
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 
                               rounded-full flex items-center justify-center text-4xl animate-bounce"
                >
                  🎯
                </div>
                <h4 className={`text-2xl font-bold ${styles.textPrimary} mb-4`}>
                  No Active Offer
                </h4>
                <p
                  className={`${styles.textSecondary} text-lg mb-8 max-w-md mx-auto`}
                >
                  Boost your ticket sales with an attractive promotional offer.
                  Create one now to attract more attendees!
                </p>
                <button
                  onClick={() => setShowAddOfferModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                                 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 
                                 hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
                >
                  <span className="text-xl">➕</span>
                  Create New Offer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Offer Modal */}
      {showAddOfferModal && (
        <AddOfferModal
          onClose={() => setShowAddOfferModal(false)}
          onSubmit={handleAddOffer}
          currentTheme={currentTheme}
          theme={theme}
        />
      )}

      <CancelEventModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        eventId={eventId}
      />
    </div>
  );
};

export default HostEventAnalytics;
