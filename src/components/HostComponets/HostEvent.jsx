// Componet for fetching events of a Host
import React from "react";
import { useEffect, useState } from "react"
import { fetchHostEvents } from "../../services/host/hostEventServices";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";


const HostEvents = () => {
    const [ events, setEvents ] = useState([]);
    const [ loading , setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    useEffect(()=> {
  const fetchEvents = async () => {
    try {
        const HostEventData = await fetchHostEvents();
        if ( !HostEventData.success ) {
            setError(HostEventData.message);
            toast.error(HostEventData.message || "Failed to fetch events");
            return;
        }
        setEvents(HostEventData.events);
        toast.success( HostEventData.message || "Profile loaded successfully" );
    } catch ( error ) {
        setError(error.message);
        toast.error( error.response.data.message ||  "Failed to load profile.");

    } finally {
        setLoading(false);
    }
  }

  fetchEvents();
    },[]);

    if ( loading ) return <p>Loading...</p>
    if ( error ) return <p>Error : {error}</p>

    return (
        <div>
            <h2>Your Events</h2>
            {events.length === 0 ? (
                <p>No Events found</p>
            ) : (
                  <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {events.map(( event ) => (
                            <tr key={event._id}>
                                <td>{event.title}</td>
                                <td>{event.category}</td>
                                <td>{new Date(event.date).toLocaleDateString()}</td>
                                <td>
                                    { event.isApproved ? (
                                         " Verified"
                                    ) : (
                                        "Unverified"
                                    ) }
                                </td>
                                <td>
                                    <button onClick={()=> navigate(`/Host/Events/Edit/${event._id}`)}>
                                        Edit
                                    </button>
                                    <button>
                                        Delete
                                    </button>
                                    <button>
                                        View bookings
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                  </table>
            )}
        </div>
    );
};

export default HostEvents;