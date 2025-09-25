// src/pages/Admin/AdminEventDetails.jsx

"use client"
import { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { getEventBookingsSummary } from "../../../services/general/EventAnalytics" 
import dayjs from "dayjs"
import { DollarSign, Ticket, TrendingUp, Clock, Calendar } from "lucide-react"; // Icons
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';

// Register Chart.js components and elements
ChartJS.register(
    ArcElement, Tooltip, Legend, 
    CategoryScale, LinearScale, BarElement, Title,
    PointElement, LineElement
);

const PRIMARY_COLOR = "#5C3BFE"; // Host component primary color
const SECONDARY_COLOR = "#3B5CFF"; // Blue accent

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;
const formatDate = (date) => dayjs(date).format("MMM DD, YYYY");

const AdminEventDetails = () => {
  const { eventId } = useParams()
  const [eventData, setEventData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState("summary")
  const [hoveredMetric, setHoveredMetric] = useState(null)
  const [dailySalesView, setDailySalesView] = useState("last7days"); 
  const COMMISSION_RATE = 10 // Used for calculations

  // --- API FETCH EFFECT ---
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getEventBookingsSummary(eventId)
        if (res.success) {
          setEventData(res.data)
        } else {
          console.error(res.message) 
        }
      } catch (error) {
        console.error("Admin Fetch Error:", error); 
      }
      setLoading(false)
    }
    fetchDetails()
  }, [eventId])

  const summary = eventData;
  
  const eventTypeFromBackend = summary?.event?.type; 
  
  
  const isPaid = eventTypeFromBackend && eventTypeFromBackend !== "free";
  
  const getFilteredDailySales = useMemo(() => {
    if (!eventData || !eventData.dailySales) return [];

    const now = dayjs();
    let startDate;

    switch (dailySalesView) {
        case "last7days":
            startDate = now.subtract(7, "days").startOf('day');
            break;
        case "currentMonth":
            startDate = now.startOf("month").startOf('day');
            break;
        case "last30days":
            startDate = now.subtract(30, "days").startOf('day');
            break;
        default:
            return eventData.dailySales;
    }

    // Filter sales to include only data points within the selected range
    return eventData.dailySales
        .filter(sale => dayjs(sale._id).isAfter(startDate))
        .sort((a, b) => dayjs(a._id).valueOf() - dayjs(b._id).valueOf());

  }, [eventData, dailySalesView]);

  const chartColors = ['#F97316', PRIMARY_COLOR, '#10B981', '#EF4444', '#6366F1'];
  const chartBorderColors = ['#D97706', SECONDARY_COLOR, '#059669', '#B91C1C', '#4F46E5'];

  const pieChartData = useMemo(() => {
    if (!eventData || !eventData.ticketStats) return { labels: [], datasets: [] };

    const labels = Object.keys(eventData.ticketStats);
    
    // Logic: If paid, chart revenue. If free, chart sold tickets.
    const data = labels.map(key => {
        const stats = eventData.ticketStats[key];
        return isPaid ? (stats.revenue || 0) : (stats.sold || 0);
    });

    return {
        labels: labels.map(label => label.toUpperCase()),
        datasets: [{
            data: data,
            backgroundColor: chartColors.slice(0, labels.length),
            borderColor: chartBorderColors.slice(0, labels.length),
            borderWidth: 1,
        }]
    };
  }, [eventData, isPaid]);

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                color: 'white',
                font: { size: 14 }
            }
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed !== null) {
                        label += isPaid ? formatCurrency(context.parsed) : `${context.parsed} Tickets`;
                    }
                    return label;
                }
            }
        },
        title: {
            display: true,
            text: isPaid ? 'Revenue Split by Category' : 'Tickets Sold by Category', 
            color: 'white',
            font: { size: 18, weight: 'bold' }
        }
    }
  };

  const barChartData = useMemo(() => {
    // Sales data should use the filtered result
    const salesData = getFilteredDailySales; 
    
    return {
      labels: salesData.map(sale => dayjs(sale._id).format("MMM DD")),
      datasets: [
        {
          label: 'Tickets Sold',
          data: salesData.map(sale => sale.count),
          backgroundColor: PRIMARY_COLOR, 
          borderColor: PRIMARY_COLOR,
          borderWidth: 1,
        }
      ]
    };
  }, [getFilteredDailySales]);


  // Helper component for styled metric cards
  const MetricCard = ({ title, value, icon: Icon, colorClass, explanation }) => (
    <div 
      className={`col-span-12 sm:col-span-6 lg:col-span-3 bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-[${PRIMARY_COLOR}] transition-all duration-300 transform hover:scale-[1.02] cursor-pointer`}
      onMouseEnter={() => setHoveredMetric(title)}
      onMouseLeave={() => setHoveredMetric(null)}
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-full ${colorClass} bg-opacity-20`}>
          <Icon className={`${colorClass}`} size={24} />
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-1 text-3xl font-bold text-white">{value}</p>
        </div>
      </div>
      {hoveredMetric === title && (
        <p className="mt-3 text-sm text-gray-400 transition-opacity duration-300">
          {explanation}
        </p>
      )}
    </div>
  );


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto text-white">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-800 rounded"></div>
            <div className="grid grid-cols-4 gap-4">
                <div className="h-24 bg-gray-800 rounded-xl col-span-1"></div>
                <div className="h-24 bg-gray-800 rounded-xl col-span-1"></div>
                <div className="h-24 bg-gray-800 rounded-xl col-span-1"></div>
                <div className="h-24 bg-gray-800 rounded-xl col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check for null eventData after loading is false
  if (!eventData || !eventData.event) {
    return (
        <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
            <h1 className="text-white text-3xl">Event data not found.</h1>
        </div>
    );
  }

  const { event, ticketsSold, totalRevenue } = summary;

  // Calculate Admin Commission
  const adminCommission = totalRevenue * (COMMISSION_RATE / 100);
  // Calculate Host Payout
  const hostPayout = totalRevenue - adminCommission;
  
  // Total tickets available
  const totalTicketsAvailable = Object.values(eventData.ticketStats).reduce((acc, stat) => acc + (stat.total || 0), 0);


  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-1">{event.title}</h1>
              <p className="text-lg text-gray-400">
                <span className={`font-semibold uppercase px-3 py-1 rounded-full text-xs mr-2 ${isPaid ? `bg-[${PRIMARY_COLOR}] text-white` : 'bg-green-600 text-white'}`}>
                    {isPaid ? 'PAID' : 'FREE'}
                </span>
                {event.category} Event
              </p>
            </div>
            <div className="text-right">
                <p className="text-xl font-semibold text-gray-300 flex items-center">
                    <Calendar size={20} className="mr-2 text-gray-500" />
                    {formatDate(event.date)}
                </p>
                <p className="text-md text-gray-500 mt-1">{event.locationName}</p>
            </div>
          </div>
        </div>

        {/* --- Metric Cards --- */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            icon={DollarSign}
            colorClass="text-green-400"
            explanation="Gross ticket sales revenue before commission."
          />
          <MetricCard
            title="Admin Commission"
            value={formatCurrency(adminCommission)}
            icon={TrendingUp}
            colorClass={`text-[${PRIMARY_COLOR}]`} 
            explanation={`${COMMISSION_RATE}% commission on total revenue.`}
          />
          <MetricCard
            title="Host Payout"
            value={formatCurrency(hostPayout)}
            icon={DollarSign}
            colorClass="text-yellow-400"
            explanation="Revenue to be paid to the host (Total Revenue - Commission)."
          />
          <MetricCard
            title="Tickets Sold"
            value={ticketsSold.toLocaleString()}
            icon={Ticket}
            colorClass="text-blue-400"
            explanation={`Total tickets booked for the event out of ${totalTicketsAvailable.toLocaleString()} available.`}
          />
        </div>

        {/* --- Tabs and Content --- */}
        <div className="mb-6 flex space-x-4 border-b border-gray-700">
            <button
                onClick={() => setActiveView("summary")}
                className={`px-4 py-2 rounded-t-lg font-semibold transition-colors ${
                    activeView === "summary" 
                        ? `bg-gray-800 text-white border-b-2 border-[${PRIMARY_COLOR}]` 
                        : "text-gray-400 hover:text-white"
                }`}
            >
                Summary & Analytics
            </button>
            <button
                onClick={() => setActiveView("list")}
                className={`px-4 py-2 rounded-t-lg font-semibold transition-colors ${
                    activeView === "list" 
                        ? `bg-gray-800 text-white border-b-2 border-[${PRIMARY_COLOR}]` 
                        : "text-gray-400 hover:text-white"
                }`}
            >
                Bookings List
            </button>
        </div>

        {activeView === "summary" && (
          <div className="grid grid-cols-12 gap-8">
            {/* --- Left Column: Charts --- */}
            <div className="col-span-12 lg:col-span-7 space-y-8">
                
                {/* Daily Sales Chart */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Daily Tickets Sold</h3>
                        {/* Chart Filter Dropdown */}
                        <div className="flex items-center space-x-2">
                            <Clock size={18} className="text-gray-400" />
                            <select
                                value={dailySalesView}
                                onChange={(e) => setDailySalesView(e.target.value)}
                                className={`bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[${PRIMARY_COLOR}] focus:border-[${PRIMARY_COLOR}] block p-2.5`}
                            >
                                <option value="last7days">Last 7 Days</option>
                                <option value="last30days">Last 30 Days</option>
                                <option value="currentMonth">Current Month</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="h-80">
                        {getFilteredDailySales.length > 0 ? (
                            <Bar data={barChartData} options={{ 
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false }, title: { display: false } },
                                scales: {
                                    y: {
                                        ticks: { color: 'gray' },
                                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                                    },
                                    x: {
                                        ticks: { color: 'gray' },
                                        grid: { display: false }
                                    }
                                }
                            }} />
                        ) : (
                            <div className="text-center py-12 text-gray-400">No sales data for this period.</div>
                        )}
                    </div>
                </div>

                {/* Tickets Sold by Category Chart (Pie Chart) */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
                    <div className="h-80 flex justify-center items-center">
                        {Object.keys(eventData.ticketStats || {}).length > 0 ? (
                            <Pie data={pieChartData} options={pieChartOptions} />
                        ) : (
                            <div className="text-center text-gray-400">No ticket categories defined or sales recorded.</div>
                        )}
                    </div>
                </div>

            </div>

            {/* --- Right Column: Ticket Stats --- */}
            <div className="col-span-12 lg:col-span-5">
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4">Ticket Category Breakdown</h3>
                    
                    {/* Table of Ticket Stats */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sold</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Remaining</th>
                                    {isPaid && <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Revenue</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {Object.keys(eventData.ticketStats || {}).map((category) => {
                                    const stats = eventData.ticketStats[category];
                                    const remaining = (stats.total || 0) - (stats.sold || 0); 
                                    
                                    return (
                                        <tr key={category} className="hover:bg-gray-800">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{category.toUpperCase()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{stats.total || 0}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-[${PRIMARY_COLOR}] font-bold`}>{stats.sold || 0}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{remaining}</td>
                                            {isPaid && <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-400">{formatCurrency(stats.revenue || 0)}</td>}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Free Event Notice */}
                {!isPaid && (
                  <div className="bg-green-900/50 border border-green-500/30 rounded-xl p-6 text-center mt-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Free Event</h3>
                    <p className="text-green-400 text-lg font-semibold">No commission applicable for free events</p>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Placeholder for Bookings List View */}
        {activeView === "list" && (
            <div className="bg-gray-800 p-8 rounded-xl min-h-[500px] flex items-center justify-center">
                <h2 className="text-2xl text-gray-400">Bookings List implementation coming soon...</h2>
            </div>
        )}

      </div>
    </div>
  )
}

export default AdminEventDetails