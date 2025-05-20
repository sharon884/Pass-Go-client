import { useEffect } from "react";
import socket from "../socket/socket";

function PingTest () {
    useEffect(() => {
        socket.on("pong",(msg) => {
            console.log("Recieved from server:", msg);
        });

        socket.emit("ping", "hellow from client");

        return () => socket.off("pong");
    },[]);

    return (
        <div>

        </div>
    )
};

export default PingTest;