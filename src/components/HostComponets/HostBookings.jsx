import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { getHostEventBookings } from "../../services/host/hostAnalyticsServices"; 
import { addOffer, cancelOffer } from "../../services/host/hostEventOfferServices"; 
import AddOfferModal from "./AddOfferModal"; 
import CancelEventModal from "../../components/HostComponets/Modals/CancelEventModal"; 

// --- CHART IMPORTS AND REGISTRATION (FIXED) ---
import { Pie, Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title,
    PointElement, 
    LineElement,
    // FIX ADDED: LineController is necessary because you use type: 'line' 
    // in the dataset object for the Revenue line.
    LineController 
} from 'chart.js'; 
import { DollarSign, Ticket, TrendingUp, Calendar, Tag, Gift, SlidersHorizontal } from "lucide-react"; 

ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title,
    PointElement, 
    LineElement,
    // FIX ADDED: Register the LineController
    LineController 
);

const formatCurrency = (amount) => `₹${(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;

const HostEventAnalytics = () => {
  const { eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  
  // State for date filtering, initialized to a current date string
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); 
  
  // Offer/Cancel Modal States Restored
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [cancellingOffer, setCancellingOffer] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  
  const { currentTheme, theme } = useTheme();
  const navigate = useNavigate();

  const fetchSummary = async () => {
    try {
        setLoading(true);
        const res = await getHostEventBookings(eventId); 
        
        if (res.success) {
            setSummary(res.data);
            // Set max date for date picker to the latest sales date or today's date
            const today = new Date().toISOString().split('T')[0];
            setSelectedDate(today);
            toast.success("Analytics loaded successfully.");
        } else {
            toast.error(res.message || "Failed to load event analytics.");
        }
    } catch (error) {
        console.error("Fetch Analytics Error:", error);
        toast.error("An error occurred while fetching data.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [eventId]);


  const handleAddOffer = async (offerData) => {
    try {
        await addOffer(eventId, offerData);
        toast.success("Offer added successfully! Data refreshing...");
        setShowAddOfferModal(false);
        await fetchSummary(); 
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add offer.");
    }
  };

  const handleCancelOffer = async (offerId) => {
    setCancellingOffer(true);
    try {
        await cancelOffer(offerId); 
        toast.success("Offer cancelled successfully! Data refreshing...");
        await fetchSummary(); 
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to cancel offer.");
    } finally {
        setCancellingOffer(false);
    }
  };
  
  // Memoized data processing for charts with date filtering
  const { isPaid, chartData } = useMemo(() => {
    let currentIsPaid = summary?.event?.type?.includes("paid") ?? false;
    let currentChartData = {
        pieChart: { labels: [], data: [] },
        barChart: { labels: [], salesData: [], revenueData: [] }
    };
    
    if (summary) {
        const ticketStats = summary.ticketStats || {};
        
        //  Pie Chart Data (Ticket Split)
        const categories = Object.keys(ticketStats).filter(cat => (ticketStats[cat].sold || 0) > 0);
        
        currentChartData.pieChart.labels = categories.map(c => c.toUpperCase());
        currentChartData.pieChart.data = categories.map(c => ticketStats[c].sold);

        //  Bar Chart Data (Daily Sales/Revenue) 
        if (summary.dailySales?.length > 0) {
            // Filter sales up to the selected date
            const filteredSales = summary.dailySales.filter(d => d.date <= selectedDate);
            
            currentChartData.barChart.labels = filteredSales.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            currentChartData.barChart.salesData = filteredSales.map(d => d.count);
            currentChartData.barChart.revenueData = filteredSales.map(d => d.revenue || 0);
        }
    }
    return { isPaid: currentIsPaid, chartData: currentChartData };
  }, [summary, selectedDate]);


  // --- CHART OPTIONS (Ensured correct for dark/light mode) ---
  const getPieChartOptions = (title) => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: { position: 'bottom', labels: { color: theme === 'dark' ? 'white' : 'black' } },
          title: { display: true, text: title, color: theme === 'dark' ? 'white' : 'black', font: { size: 16 } },
      },
  });

  const getBarChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: isPaid, labels: { color: theme === 'dark' ? 'white' : 'black' } },
        title: { display: true, text: `Daily Sales/Bookings Trend (up to ${new Date(selectedDate).toLocaleDateString()})`, color: theme === 'dark' ? 'white' : 'black', font: { size: 16 } },
    },
    scales: {
        y: { 
            type: 'linear',
            position: 'left',
            beginAtZero: true, 
            title: { display: true, text: 'Tickets Sold', color: theme === 'dark' ? 'white' : 'black' },
            grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }, 
            ticks: { color: theme === 'dark' ? 'white' : 'black' } 
        },
        y1: isPaid ? {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            title: { display: true, text: 'Revenue (₹)', color: theme === 'dark' ? 'white' : 'black' },
            grid: { drawOnChartArea: false, color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }, 
            ticks: { color: theme === 'dark' ? 'white' : 'black' }
        } : undefined,
        x: { 
            grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }, 
            ticks: { color: theme === 'dark' ? 'white' : 'black' } 
        }
    }
  });


  
  if (loading) {
    return (
      <div className={`${currentTheme.background} min-h-screen flex items-center justify-center`}>
        <h2 className={`${currentTheme.textPrimary}`}>Loading Analytics...</h2>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className={`${currentTheme.background} min-h-screen flex items-center justify-center p-8`}>
        <div className="text-center">
          <h2 className={`${currentTheme.textPrimary} text-2xl font-bold`}>No Data Available</h2>
          <p className={`${currentTheme.textSecondary} mt-2`}>Could not retrieve event analytics.</p>
        </div>
      </div>
    );
  }
  
  const { event, ticketsSold, totalRevenue, offer } = summary;
  
  return (
    <div className={`${currentTheme.background} min-h-screen p-4 sm:p-6 lg:p-8`}>
      <div className="max-w-6xl mx-auto">
        {/* Header and Controls */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className={`${currentTheme.textPrimary} text-3xl sm:text-4xl font-extrabold`}>
            Analytics: {event.title}
          </h1>
          <div className="flex space-x-2">
           
             <button
                onClick={() => navigate(`/host/events-edit/${eventId}`)} 
                className={`px-4 py-2 rounded-lg font-semibold text-sm ${currentTheme.buttonPrimary}`}
              >
                Edit Event
              </button>
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="px-4 py-2 rounded-lg font-semibold text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Cancel Event
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
       
          {isPaid && (
            <div className={`p-5 rounded-xl shadow-lg ${currentTheme.cardBackground} border ${currentTheme.borderColor} transition-transform duration-300 hover:scale-[1.02]`}>
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Total Revenue</p>
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mt-1`}>{formatCurrency(totalRevenue)}</h2>
              <p className={`text-xs ${currentTheme.textSecondary} mt-2`}>Net amount from ticket sales</p>
            </div>
          )}
          
          {/* Card 2: Tickets Sold */}
          <div className={`p-5 rounded-xl shadow-lg ${currentTheme.cardBackground} border ${currentTheme.borderColor} transition-transform duration-300 hover:scale-[1.02]`}>
            <div className="flex items-center justify-between">
              <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Tickets Booked</p>
              <Ticket className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mt-1`}>{ticketsSold.toLocaleString()}</h2>
            <p className={`text-xs ${currentTheme.textSecondary} mt-2`}>Total tickets booked</p>
          </div>
          
          {/* Card 3: Event Status */}
          <div className={`p-5 rounded-xl shadow-lg ${currentTheme.cardBackground} border ${currentTheme.borderColor} transition-transform duration-300 hover:scale-[1.02]`}>
            <div className="flex items-center justify-between">
              <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Event Status</p>
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mt-1`}>{event.status.toUpperCase()}</h2>
            <p className={`text-xs ${currentTheme.textSecondary} mt-2`}>Current lifecycle of the event</p>
          </div>
          
          {/* Card 4: Active Offer */}
          <div className={`p-5 rounded-xl shadow-lg ${currentTheme.cardBackground} border ${currentTheme.borderColor} transition-transform duration-300 hover:scale-[1.02]`}>
            <div className="flex items-center justify-between">
              <p className={`text-sm font-medium ${currentTheme.textSecondary}`}>Active Offer</p>
              <Gift className="w-5 h-5 text-pink-500" />
            </div>
            <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mt-1`}>
              {offer ? `${offer.value}${offer.discountType === 'percentage' ? '%' : ' flat'}` : 'None'}
            </h2>
            <p className={`text-xs ${currentTheme.textSecondary} mt-2`}>
              {offer ? `Expires: ${new Date(offer.expiryDate).toLocaleDateString()}` : 'No active promotion running'}
            </p>
          </div>
        </div>

        {/* Chart Section (Tickets Split and Daily Trend) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
          {/* LEFT: Ticket Split Pie Chart  */}
          <div className={`lg:col-span-1 p-6 rounded-xl shadow-lg ${currentTheme.cardBackground} border ${currentTheme.borderColor} h-[400px] flex flex-col justify-center`}>
            <h3 className={`${currentTheme.textPrimary} text-xl font-bold mb-4`}>Ticket Category Split</h3>
            {chartData.pieChart.data.length > 0 ? (
                <div className="flex-1">
                    <Pie 
                        data={{
                            labels: chartData.pieChart.labels,
                            datasets: [{
                                data: chartData.pieChart.data,
                                backgroundColor: ['#5C3BFE', '#4C2BEE', '#FF6384', '#FF9F40'],
                                hoverBackgroundColor: ['#4C2BEE', '#3B1BE0', '#FF4374', '#FF8F30'],
                            }],
                        }} 
                        options={getPieChartOptions("Ticket Category Split")}
                    />
                </div>
            ) : (
                 <div className="text-center py-12">
                    <p className={`${currentTheme.textSecondary}`}>No ticket sales data available for chart.</p>
                </div>
            )}
          </div>
          
          {/* Daily Sales Bar Chart ( with Date Picker) */}
          <div className={`lg:col-span-2 p-6 rounded-xl shadow-lg ${currentTheme.cardBackground} border ${currentTheme.borderColor} h-[400px] flex flex-col`}>
             <div className="flex justify-between items-center mb-4">
                 <h3 className={`${currentTheme.textPrimary} text-xl font-bold`}>Daily Sales/Bookings Trend</h3>
                 {/* FIX 2: Date Selector for Chart */}
                 <div className="flex items-center space-x-2">
                    <SlidersHorizontal className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                    <label htmlFor="date-filter" className={`text-sm ${currentTheme.textSecondary}`}>Filter up to:</label>
                    <input
                        type="date"
                        id="date-filter"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]} 
                        className={`p-1 border rounded-md text-sm ${currentTheme.textPrimary} ${currentTheme.inputBackground}`}
                    />
                 </div>
             </div>
             
             {chartData.barChart.labels.length > 0 ? (
                 <div className="flex-1">
                    <Bar
                        data={{
                            labels: chartData.barChart.labels,
                            datasets: [
                                {
                                    label: 'Tickets Sold',
                                    data: chartData.barChart.salesData,
                                    backgroundColor: '#5C3BFE',
                                    order: 1, 
                                    yAxisID: 'y'
                                },
                                ...(isPaid ? [{
                                    label: 'Revenue (₹)',
                                    data: chartData.barChart.revenueData,
                                    type: 'line', 
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                    fill: false,
                                    yAxisID: 'y1'
                                }] : [])
                            ],
                        }}
                        options={getBarChartOptions()}
                    />
                 </div>
             ) : (
                <div className="text-center py-12">
                    <p className={`${currentTheme.textSecondary}`}>No daily transaction data available up to the selected date.</p>
                </div>
             )}
          </div>
        </div>

        {/* Ticket Sales Breakdown Table ( Data is now accurate) --- */}
        <div className={`p-6 rounded-xl shadow-lg ${currentTheme.cardBackground} border ${currentTheme.borderColor} mb-8`}>
          <h3 className={`${currentTheme.textPrimary} text-xl font-bold mb-4 flex items-center`}>
            <Tag className="w-5 h-5 mr-2 text-blue-500"/> Ticket Category Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={`${currentTheme.backgroundAlt}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Category</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Total Tickets</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Tickets Sold</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Tickets Remaining</th>
                  {isPaid && <th className={`px-6 py-3 text-left text-xs font-medium ${currentTheme.textSecondary} uppercase tracking-wider`}>Revenue Generated</th>}
                </tr>
              </thead>
              <tbody className={`divide-y ${currentTheme.divideColor}`}>
                {/* Iterate over the corrected ticketStats structure */}
                {Object.keys(summary.ticketStats).map(category => {
                  const stats = summary.ticketStats[category];
                  
                  return (
                    <tr key={category}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${currentTheme.textPrimary}`}>{category.toUpperCase()}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.textPrimary}`}>{stats.total}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.textPrimary} font-bold text-blue-500`}>{stats.sold || 0}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.textSecondary}`}>{stats.remaining}</td>
                      {/* stats.revenue is now accurate from backend */}
                      {isPaid && <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-green-500`}>{formatCurrency(stats.revenue)}</td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
      
        <div className={`p-6 rounded-xl shadow-lg ${currentTheme.cardBackground} border ${currentTheme.borderColor} text-center`}>
            <h3 className={`${currentTheme.textPrimary} text-2xl font-bold mb-4`}>Offer Management</h3>
            {offer ? (
                // Show cancel option when offer is available
                <div className="space-y-4">
                    <p className={`${currentTheme.textPrimary} text-lg font-semibold`}>
                        Active Offer: **{offer.value}{offer.discountType === 'percentage' ? '%' : ' flat'}** discount
                    </p>
                    <p className={`${currentTheme.textSecondary} text-sm`}>
                        Expires on: {new Date(offer.expiryDate).toLocaleDateString()}
                    </p>
                    <button
                        onClick={() => handleCancelOffer(offer._id)}
                        disabled={cancellingOffer}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                        {cancellingOffer ? 'Cancelling...' : 'Cancel Active Offer'}
                    </button>
                </div>
            ) : (
                // Show add option when no offer is available 
                <div>
                    <p className={`${currentTheme.textSecondary} text-lg mb-4`}>No active offer found.</p>
                    <button
                        onClick={() => setShowAddOfferModal(true)}
                        className={`px-6 py-2 rounded-lg font-semibold text-white ${currentTheme.buttonPrimary}`}
                    >
                        Create New Offer
                    </button>
                </div>
            )}
        </div>
        
      </div>
      
      {/* Modals (RESTORED) */}
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