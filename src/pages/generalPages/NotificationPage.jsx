import NotificationPanel from "../../components/Notifications/NotificationPanel";
import { useSelector } from "react-redux";

const NotificationPage = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id || localStorage.getItem("id");
  const role = user?.role || localStorage.getItem("role");

  return (
    <div className="max-w-2xl mx-auto p-4 mt-4">
      <h2 className="text-2xl font-semibold mb-4">Your Notifications</h2>
      <NotificationPanel userId={userId} role={role} />
    </div>
  );
};

export default NotificationPage;
