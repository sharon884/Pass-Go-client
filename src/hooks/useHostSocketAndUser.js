import { useEffect, useState } from "react";
import { getUserProfile } from "../services/user/userProfileServices";
import { socket } from "../utils/socket/socket";
import { toast } from "sonner";

const useHostSocketAndUser = () => {

    const [ user, setUser ] = useState(null);
    const [ statusChanged, setStatusChanged ] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authenticated = localStorage.getItem("isAuthenticated");
                const role = localStorage.getItem("role");
                console.log(role);
                if ( !authenticated || role != "user") {
                    return;
                }
                const response = await getUserProfile();
                const userData = response.user;
                setUser(userData);
                if ( userData.id ) {
                    socket.emit("verifying-host", userData.id);
                }
            } catch ( error ) {
                console.error("Error fetching user:", error.message);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if ( !user?.id ) return;
        socket.on("host-verification-result", ({ status, message}) => {
            console.log("✅ Received from socket:", status, message); // add this
            toast.success(message);
            setStatusChanged(status);
        });

        return () => socket.off("host-verification-result");
    },[ user?.id]);

    return { user, statusChanged };
};

export default useHostSocketAndUser;