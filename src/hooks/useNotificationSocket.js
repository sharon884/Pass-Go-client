import { useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "../utils/socket/socket";
import { toast } from "sonner";

const useNotificationSocket = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
  if (!isAuthenticated || !user?.id) return;

  socket.emit("join-notification-room", user.id);
  console.log("user joined the notification room", user.id);

  const handleNotification = ({ type, message }) => {
    console.log(message)
    toast.info(`[${type.toUpperCase()}] ${message}`);
  };

  socket.on("new-notification", handleNotification);
   socket.off("new-notification", handleNotification);
   socket.on("new-notification", handleNotification);

  return () => {
    socket.off("new-notification", handleNotification);
  };
}, [isAuthenticated, user?.id]);
};

export default useNotificationSocket;
