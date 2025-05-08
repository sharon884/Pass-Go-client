import react  from "react";
import { useEffect, useState  } from "react";
import api from "../../utils/api/api";
import { Link } from "react-router-dom";

const UserEvents = () => {
    const [ events , setEvents ] = useState([]);

    useEffect(()=> {
        const fetchEvents = async () => {
            try {
                const response = await api.get("/user/events/approvedevents");
                setEvents(response.data.events);
               
            } catch ( error ) {
                console.log("events fetching error", error );
            };
        };

        fetchEvents();
    },[])

    return (
        <>
        {events.map((events)=> (
                <Link to={`/yourEvent/${events._id}`}>
            <div key={events._id}>
                <img src={events.images[0]} alt={events.title} />
                <h2>
                    {events.title}
                </h2>
                <h3>{events.category}</h3>
                <p>{new Date(events.date).toString()}</p>
                
                <button>View details</button>

            </div>
                </Link>
        ))}
        
        </>
    );
};

export default UserEvents;