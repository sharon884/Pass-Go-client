import { useEffect } from "react";
import { useState } from "react";
import socket from "../../socket/socket";



const AdminVerifyPage = () => {

    const [ requests , setRequests ] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
  console.log('CLIENT: Successfully connected to Socket.IO server.');
  console.log('CLIENT: My Socket ID is:', socket.id); // Log the client's socket ID
});

socket.on('welcome', (data) => {
  console.log('CLIENT: Received "welcome" event:', data); // This confirms the server middleware ran and emitted 'welcome'
});

socket.on('disconnect', (reason) => {
  console.log('CLIENT: Disconnected from Socket.IO server. Reason:', reason);
});

socket.on('connect_error', (err) => {
  console.error('CLIENT: Connection Error:', err.message);
  if (err.data) console.error('CLIENT: Error Data:', err.data); // auth errors often show up here
  // Depending on the Socket.IO client version and error:
  if (err.description) console.error('CLIENT: Error Description:', err.description);
  if (err.context) console.error('CLIENT: Error Context:', err.context);
});

// Add a listener for 'reconnect' as well, given your options
socket.on('reconnect', (attemptNumber) => {
    console.log('CLIENT: Reconnected successfully after', attemptNumber, 'attempts.');
});

socket.on('reconnect_error', (err) => {
    console.error('CLIENT: Reconnection Error:', err.message);
});

socket.on('reconnect_failed', () => {
    console.error('CLIENT: Reconnect Failed permanently.');
});

        const handleNewRequest = (payload) => {
            setRequests((prev) => [ payload, ...prev]);
        }
console.log('listing for reqq')
        socket.on("new-verify-request", handleNewRequest);

        return () => socket.off("new-verify-request", handleNewRequest);
    },[]);

    if (!requests.length ) {
        return <p>No Pending requests</p>
    };

    return (
        <div>
            {requests.map(({ hostId, name, time }) => (
                <div key={hostId}>
                    <div>
                        <p>{name}</p>
                        <p>requested at {new Date(time).toLocaleString()}</p>
                    </div>

                </div>
            ))}
        </div>
    )
};

export default AdminVerifyPage;



// import { useState, useEffect } from "react";
// import socket from "../../socket/socket";
// import { toast } from "sonner";         // or react-toastify

// export default function PendingHosts() {
//   const [pending, setPending] = useState([]);            // table data

//   // helper used by the listener
//   const addRowToPendingTable = ({ hostId, name }) =>
//     setPending(prev => [...prev, { hostId, name }]);

//   /* ---------- real‑time listener ---------- */
//   useEffect(() => {
//     socket.on("new-verify-request", ({ hostId, name }) => {
//       addRowToPendingTable({ hostId, name });
//       toast.info(`New host to verify: ${name}`);
//     });
//     return () => socket.off("new-verify-request");
//   }, []);

//   /* ---------- render ---------- */
//   return (
//     <div>
//       <h2 className="mb-4 text-xl font-semibold">Pending Host Verifications</h2>
//       {pending.length === 0 ? (
//         <p>No pending requests</p>
//       ) : (
//         <table className="min-w-full border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border">Host ID</th>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pending.map(({ hostId, name }) => (
//               <tr key={hostId}>
//                 <td className="p-2 border">{hostId}</td>
//                 <td className="p-2 border">{name}</td>
//                 <td className="p-2 border">
//                   <button
//                     onClick={() => handleApprove(hostId)}
//                     className="px-3 py-1 bg-green-600 text-white rounded"
//                   >
//                     Verify
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );

//   /* ---------- approve button logic ---------- */
//   async function handleApprove(hostId) {
//     try {
//       await api.post(`/admin/hosts/${hostId}/verify`);
//       toast.success("Host verified");
//       // remove from table
//       setPending(prev => prev.filter(h => h.hostId !== hostId));
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Verify failed");
//     }
//   }
// }
