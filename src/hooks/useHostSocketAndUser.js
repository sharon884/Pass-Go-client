import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../utils/socket/socket";
import { toast } from "sonner";

const useHostSocketAndUser = () => {

    const { user, isAuthenticated } = useSelector(( state ) => state.auth);
    const [ statusChanged, setStatusChanged ] = useState(null);

    // const [ user, setUser ] = useState(null);
    // const [ statusChanged, setStatusChanged ] = useState(null);

    useEffect(() => {

        if ( isAuthenticated && user?.role == "user" && user?.id ) {
            socket.emit("verifying-host", user.id);
        }
        // const fetchUser = async () => {
        //     try {
        //         const authenticated = localStorage.getItem("isAuthenticated");
        //         const role = localStorage.getItem("role");
        //         if ( !authenticated || role != "user") {
        //             return;
        //         }
        //         const response = await getUserProfile();
        //         const userData = response.user;
        //         setUser(userData);
        //         if ( userData.id ) {
        //             socket.emit("verifying-host", userData.id);
        //         }
        //     } catch ( error ) {
        //         console.error("Error fetching user:", error.message);
        //     }
        // };

        // fetchUser();
    }, [isAuthenticated,user?.id, user?.role]);

    useEffect(() => {
        if ( !user?.id ) return;
        socket.on("host-verification-result", ({ status, message}) => {
          
            toast.success(message);
            setStatusChanged(status);
        });

        return () => socket.off("host-verification-result");
    },[ user?.id]);

    return { statusChanged };
};

export default useHostSocketAndUser;