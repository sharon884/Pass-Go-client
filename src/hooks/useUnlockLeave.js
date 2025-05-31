import { useEffect , useRef } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { unlockSeats } from "../services/user/userTickerServices";
import { socket } from "../utils/socket/socket";
import { toast } from "sonner";

const useUnlockOnLeave = ( eventId , selectedSeats, shouldUnlock = true ) => {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedSeatsRef = useRef(selectedSeats);
    const shouldUnlockRef = useRef(shouldUnlock);

    useEffect(() => {
        selectedSeatsRef.current = selectedSeats;
        shouldUnlockRef.current = shouldUnlock; 
    },[selectedSeats, shouldUnlock]);

    const handleUnlockSeats = async () => {
        const seatsToUnlock = selectedSeatsRef.current;

        if ( !shouldUnlockRef.current || selectedSeatsRef.current.length == 0|| eventId){
            return;
        };  
        console.log("unlocking seats on navigation:", selectedSeatsRef.current);
        try {
            await unlockSeats(eventId, seatsToUnlock);
            console.log("successfully unlocked seats via API");
        } catch ( error ) {
            console.log("Error unlocking seats:", error.message);
        }

        socket.emit("unlock-seats", {
            eventId,
            seats : seatsToUnlock
        });

        toast.info("Your seat selection has been released.", {
            duration : 5000,
            icon : "-lock",
        });

       
           //handle browser navigation ( back button ,etc )

        //    useEffect(() => {
        //     const unlisten = navigate.listen(({ action }) => {
        //         if( action === "pop") {
        //             handleUnlockSeats();
        //         }
        //     })
        //     return () => {
        //         unlisten();
        //     };
        //    },[navigate, eventId ])

           //handle tab close or refresh
           useEffect(() => {
            const handleBeforeUnload = () => {
               if ( shouldUnlockRef.current && selectedSeatsRef.current.length > 0) {
               socket.emit("unlock-seats", {
                eventId,
                seats : selectedSeatsRef.current,
               });
               }
            };

            window.addEventListener("beforeunload", handleBeforeUnload);

            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
           },[eventId]);

           //handle component unmount
           useEffect(() => {
            return () => {
                handleUnlockSeats();
            };
           },[eventId]);

           return handleUnlockSeats;
      
    }
    }


export default useUnlockOnLeave;
    


