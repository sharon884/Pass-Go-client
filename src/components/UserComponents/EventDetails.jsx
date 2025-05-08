import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api/api";

const EventDetails = () => {
    const { id } = useParams();
    const [ event , setEvent ] = useState(null);

    useEffect(()=> {
        const fetchEvent = async () => {
            try {
                const response = await api.get(`/user/events/approvedevents/${id }`)
                console.log(response.data.event);
               
                setEvent(response.data.event);
            } catch ( error ) {
                console.log("Failed to fetch event", error);
            }

        }
        fetchEvent();
    },[id])

    if ( !event ) return <p>Loading....</p>
    console.log("Business Info: ", event.businessInfo);
    return(
        <div>
            <h1>{event.title}</h1>
            {event.images && event.images.length > 0 && (
                <img src={event.images[0]} alt={event.title} />
            )}
            <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Location:</strong> {event.location}</p>
      
      <h3>Tickets</h3>
      <p>VIP Price: {event?.tickets?.VIP?.price ?? "N/A"}</p>
<p>VIP Quantity: {event?.tickets?.VIP?.quantity ?? "N/A"}</p>
<p>General Price: {event?.tickets?.general?.price ?? "N/A"}</p>
<p>General Quantity: {event?.tickets?.general?.quantity ?? "N/A"}</p>


            <h2>Business Info</h2>
            <p>{event.businessInfo ? event.businessInfo.name : "N/A"}</p>
<p>{event.businessInfo ? event.businessInfo.organization_name : "N/A"}</p>
<p>{event.businessInfo?.email ?? "N/A"}</p>
<p>{event.businessInfo?.mobile ?? "N/A"}</p>
      
        </div>
    );
};

export default  EventDetails;