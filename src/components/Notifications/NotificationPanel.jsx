import { useEffect, useState, useRef, useCallback } from "react";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteReadNotifications,
} from "../../services/notificationService";
import { toast } from "sonner";
import { Button } from "../ui/button";

function NotificationPanel({ userId, role, onNotificationRead }) {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const fetchMore = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const res = await fetchNotifications({ page, limit: 10, role });
    if (res.success) {
      setNotifications((prev) => [...prev, ...res.data]);
      setHasMore(res.pagination.hasMore);
      setPage((prev) => prev + 1);
    } else toast.error(res.message);
    setLoading(false);
  }, [page, role, hasMore]);

  useEffect(() => {
    fetchMore();
  }, [role]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) fetchMore();
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader.current, hasMore]);

  const handleMarkAllRead = async () => {
    const res = await markAllNotificationsAsRead();
    if (res.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success("All marked as read");
    }
  };

  const handleDeleteRead = async () => {
    const res = await deleteReadNotifications();
    if (res.success) {
      setNotifications((prev) => prev.filter((n) => !n.read));
      toast.success("Deleted all read notifications");
    }
  };

  const handleMarkRead = async (id) => {
    const res = await markNotificationAsRead(id);
    if (res.success) {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      onNotificationRead?.();
    }
  };

  return (
    <div className="text-sm max-h-[500px] overflow-y-auto">
      <div className="flex justify-between mb-2 px-2">
        <Button size="sm" onClick={handleMarkAllRead} variant="secondary">
          Mark All Read
        </Button>
        <Button size="sm" onClick={handleDeleteRead} variant="destructive">
          Delete Read
        </Button>
      </div>
      <div className="space-y-2 px-1">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => handleMarkRead(n._id)}
              className={`p-3 rounded-md border shadow-sm cursor-pointer transition hover:bg-gray-50 ${
                n.read ? "bg-gray-100" : "bg-white"
              }`}
            >
              <p className="font-medium text-sm">{n.title || "Notification"}</p>
              <p className="text-gray-600 text-xs">{n.message}</p>
              <span className="text-gray-400 text-[10px]">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
      {hasMore && <div ref={loader} className="h-8" />}
    </div>
  );
}

export default NotificationPanel;
