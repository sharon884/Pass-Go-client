import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { fetchNotifications } from "../../services/general/notificationService";
import NotificationPanel from "./NotificationPanel";

function NotificationBell() {
  const reduxUser = useSelector((state) => state.auth.user);
  const userId = reduxUser?.id;
  const role = reduxUser?.role || localStorage.getItem("role");

  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();

  useEffect(() => {
    const fetchUnread = async () => {
      const res = await fetchNotifications({ page: 1, limit: 50, role });
      if (res.success) {
        const unread = res.data.filter((n) => !n.read).length;
        setUnreadCount(unread);
      }
    };
    if (userId && role) fetchUnread();
  }, [userId, role]);

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationRead = () => {
    setUnreadCount((prev) => Math.max(prev - 1, 0));
  };

  // 🔐 Prevent rendering if user not yet available
  if (!userId || !role) return null;

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-96 z-50 shadow-lg bg-white rounded-xl border p-2">
          <NotificationPanel
            role={role}
            userId={userId}
            onNotificationRead={handleNotificationRead}
          />
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
