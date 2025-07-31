"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom" // Import useNavigate
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteReadNotifications,
} from "../../services/general/notificationService"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { InfoIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon, BellRingIcon } from "lucide-react" // Import Lucide icons

// Helper function to get the appropriate icon based on notification type
const getIcon = (type) => {
  switch (type) {
    case "info":
      return <InfoIcon className="w-4 h-4 text-blue-500" />
    case "success":
      return <CheckCircleIcon className="w-4 h-4 text-green-500" />
    case "warning":
      return <AlertTriangleIcon className="w-4 h-4 text-yellow-500" />
    case "error":
      return <XCircleIcon className="w-4 h-4 text-red-500" />
    case "alert":
      return <BellRingIcon className="w-4 h-4 text-orange-500" />
    default:
      return <InfoIcon className="w-4 h-4 text-gray-500" />
  }
}

function NotificationPanel({ userId, role, onNotificationRead }) {
  const [notifications, setNotifications] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const loader = useRef(null)
  const navigate = useNavigate() // Initialize useNavigate

  const fetchMore = useCallback(async () => {
    if (!hasMore || loading) return
    setLoading(true)
    const res = await fetchNotifications({ page, limit: 10, role })
    if (res.success) {
      setNotifications((prev) => [...prev, ...res.data])
      setHasMore(res.pagination.hasMore)
      setPage((prev) => prev + 1)
    } else toast.error(res.message)
    setLoading(false)
  }, [page, role, hasMore, loading]) // Added loading to dependency array

  useEffect(() => {
    // Reset notifications and page when role changes or component mounts
    setNotifications([])
    setPage(1)
    setHasMore(true)
    // Fetch initial notifications
    fetchMore()
  }, [role]) // Only re-fetch when role changes

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          // Check !loading to prevent multiple fetches
          fetchMore()
        }
      },
      { threshold: 1 },
    )
    if (loader.current) observer.observe(loader.current)
    return () => {
      if (loader.current) observer.unobserve(loader.current)
    }
  }, [loader.current, hasMore, loading, fetchMore]) // Added fetchMore and loading to dependency array

  const handleMarkAllRead = async () => {
    const res = await markAllNotificationsAsRead()
    if (res.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      toast.success("All marked as read")
      onNotificationRead?.() // Notify parent component
    } else {
      toast.error(res.message)
    }
  }

  const handleDeleteRead = async () => {
    const res = await deleteReadNotifications()
    if (res.success) {
      setNotifications((prev) => prev.filter((n) => !n.read))
      toast.success("Deleted all read notifications")
      onNotificationRead?.() // Notify parent component
    } else {
      toast.error(res.message)
    }
  }

  const handleNotificationClick = async (notification) => {
    // Mark as read first if not already read
    if (!notification.read) {
      const res = await markNotificationAsRead(notification._id)
      if (res.success) {
        setNotifications((prev) => prev.map((n) => (n._id === notification._id ? { ...n, read: true } : n)))
        onNotificationRead?.() // Notify parent component
      } else {
        toast.error(res.message)
        return // Stop if marking as read failed
      }
    }

    // Navigate if link exists
    if (notification.link) {
      navigate(notification.link)
    }
  }

  return (
    <div className="text-sm max-h-[500px] overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleMarkAllRead} variant="secondary" className="text-xs">
            Mark All Read
          </Button>
          <Button size="sm" onClick={handleDeleteRead} variant="destructive" className="text-xs">
            Delete Read
          </Button>
        </div>
      </div>
      <div className="space-y-3 px-1">
        {notifications.length === 0 && !loading ? (
          <p className="text-gray-500 text-center py-4">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => handleNotificationClick(n)}
              className={`p-3 rounded-lg border shadow-sm cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                n.read ? "bg-gray-100 text-gray-600" : "bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">{getIcon(n.iconType)}</div>
              <div className="flex-grow">
                <p className="font-medium text-sm">{n.title || "Notification"}</p>
                <p className="text-gray-600 text-xs">{n.message}</p>
                {n.reason && <p className="text-gray-500 text-[10px] mt-1">Reason: {n.reason}</p>}
                <span className="text-gray-400 text-[10px] block mt-1">{new Date(n.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {hasMore && !loading && <div ref={loader} className="h-8" />}
    </div>
  )
}

export default NotificationPanel
