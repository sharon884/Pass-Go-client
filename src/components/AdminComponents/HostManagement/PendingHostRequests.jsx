import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchPendingHostRequests, approveHostRequest,rejectHostVerifyRequest } from "../../../services/admin/hostMangementServices";
import RejectionModal from "./RejectionModal";

const FetchPendingHostRequests = () => {
    const [ pendingHosts, setPendingHosts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ showModal , setShowModal ] = useState(false);
    const [ selectedUser, setSelectedUser ] = useState(null);

    useEffect(() => {
        const loadHosts = async () => {
            try {
                const response = await fetchPendingHostRequests();
                setPendingHosts(response.data);
            } catch ( error ) {
                toast.error("Failed to load host requests");
            } finally {
                setLoading(false);
            }
        };

        loadHosts();
    }, []);

    const handleApprove = async ( userId ) => {
        try {
            await approveHostRequest(userId);
            toast.success("Host approved successfully!");
            setPendingHosts((prev) => prev.filter((user) => user._id !== userId));
        } catch {
            toast.error("Approval failed");
        }
    };

    const handleReject = ( user ) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const submitRejection = async ( reason ) => {
        try {
            await rejectHostVerifyRequest(selectedUser._id, reason);
            toast.success("Host rejected successfully");
            setPendingHosts((prev) => prev.filter((user) => user._id !== selectedUser._id));
        } catch {
            toast.error("Rejection failed");
        } finally {
            setShowModal(false);
        }
    };

    return (
        <div>
            <h1>Pending Host Requests</h1>
          { loading ? (
            <p>Loading....</p>
          ) : pendingHosts.length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>PANCARD</th>
                        <th>Requested At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingHosts.map((host) => (
                        <tr key={host._id}>
                            <td>{host.name}</td>
                            <td>{host.mobile}</td>
                            <td>{host.panImage}</td>
                            <td>{new Date(host.verifyRequestedAt).toLocaleString()}</td>
                            <td>
                                <button onClick={() => handleApprove(host._id)}>Approve</button>
                                 <button onClick={() => handleReject(host)} >
                                    Reject
                                 </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          )}
            <RejectionModal isOpen={showModal} onClose={()=> setShowModal(false)} onSubmit={submitRejection}/>
        

        </div>
    )
};

export default FetchPendingHostRequests;