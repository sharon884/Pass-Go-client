import { useEffect, useState } from "react";
import { fetchAdminAnalytics } from "../../../services/admin/adminAnalyticsService";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function AdminAnalyticsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAdminAnalytics();
        setStats(data);
      } catch (err) {
        toast.error("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><h4>Total Commission</h4><p className="text-xl font-bold">₹{stats.totalCommission}</p></CardContent></Card>
        <Card><CardContent className="p-4"><h4>This Month's Commission</h4><p className="text-xl font-bold">₹{stats.currentMonthCommission}</p></CardContent></Card>
        <Card><CardContent className="p-4"><h4>This Year’s Commission</h4><p className="text-xl font-bold">₹{stats.currentYearCommission}</p></CardContent></Card>
        <Card><CardContent className="p-4"><h4>Running Events</h4><p className="text-xl font-bold">{stats.runningEventsCount}</p></CardContent></Card>
        <Card><CardContent className="p-4"><h4>Cancelled Events</h4><p className="text-xl font-bold">{stats.cancelledEventsCount}</p></CardContent></Card>
      </div>

      {/* Monthly Commission Chart */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h4 className="text-lg font-semibold mb-4">Monthly Commission</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.monthlyCommission}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Yearly Commission Chart */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h4 className="text-lg font-semibold mb-4">Yearly Commission</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.yearlyCommission}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Type Breakdown */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-lg font-semibold mb-4">Event Type Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(stats.eventTypeBreakdown).map(([name, value], i) => ({ name, value }))}
                cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label
              >
                {Object.entries(stats.eventTypeBreakdown).map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Ticket Type Breakdown */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-lg font-semibold mb-4">Ticket Type Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(stats.ticketTypeBreakdown).map(([name, value], i) => ({ name, value }))}
                cx="50%" cy="50%" outerRadius={100} fill="#ffc658" label
              >
                {Object.entries(stats.ticketTypeBreakdown).map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
