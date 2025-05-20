import { io } from "socket.io-client";

console.log(import.meta.env.VITE_BACKEND_URL
);

const token = localStorage.getItem("accessToken");
const socket = io(import.meta.env.VITE_BACKEND_URL, {
    withCredentials : true,
    auth : {
        token,
    },
     reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
    // Force a new connection instead of trying to reuse the session
    forceNew: true
});

export default socket;