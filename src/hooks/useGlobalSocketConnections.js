// useGlobalSocketConnections.js
import useNotificationSocket from "./useNotificationSocket";
import useHostSocketAndUser from "./useHostSocketAndUser";

const useGlobalSocketConnections = () => {
  useNotificationSocket();
  useHostSocketAndUser();
};

export default useGlobalSocketConnections;
