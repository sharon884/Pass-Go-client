// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getEventById } from "../../../../Server/controllers/userController/userEventController";
// import { updateEventById } from "../../services/host/hostEventServices";
// import { toast } from "sonner";

// const EditEvent = () => {
//     const { eventId } = useParams();
//     const navigate = useNavigate();
//     const [ eventData, setEventData ] = useState(null);
//     const [ loading, setLoading ] = useState(null);

//     useEffect(()=> {
//         const fetchEventDetails = async () => {
//             try {
//                 const response = await getEventById(eventId);
//                 if ( response.success ) {
//                     setEventData(response.data.event);
//                 } else {
//                     toast.error(response.message);
//                 }
//             } catch ( error ) {
//                 toast.error(error.data.message || "Something went wrong while fetching event");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchEventDetails();

//     },[eventId]);
    
//     const handleChange = ( e ) => {
//         setEventData({ ...eventData, [e.target.name] : e.target.value});
//     };

//     const handleSubmit = async ( e ) => {
//         e.preventDefault();
//         try {
//             const response  = await updateEventById( eventId, eventData );
//             if ( response.success ) {
//                 toast.success("Event Updated successfully!");
//                 navigate("/Host-Events");
//             } else {
//                 toast.error(response.page);
//             }
//         }catch ( error ) {
//             toast.error("Failed to update event");
//         }
//     };

//     if ( loading ) return <div>Loading...</div>
//     if ( !eventData ) return <div>Event not found...</div>

//     return (
//         <div>
//             <h2>Edit Event</h2>
//             <form>
//                 <input type="text" name="title" value={eventData.tile} onChange={handleChange} />
//                 <input type="text" name="category" value={eventData.category} onChange={handleChange} />
//                 <input type="text" name="Location" value={eventData.location} onChange={handleChange} />
//                 <input type="text" name="date" value={eventData.date} onChange={handleChange} />
//                 <input type="text" name="time" value={eventData.time} onChange={handleChange} />
//                 <input type="text" name="Description" value={eventData.description} onChange={handleChange} />
//                 <input type="file" name="images" accept="/images*" value={eventData.category} onChange={handleChange} />
//                 <p>Tickets</p>
//                 <p>VIP Tickets</p>
//                 <input type="text" name="category" value={eventData.category} onChange={handleChange} />
//                 <input type="text" name="category" value={eventData.category} onChange={handleChange} />
//                 <input type="text" name="category" value={eventData.category} onChange={handleChange} />
//                 <input type="text" name="category" value={eventData.category} onChange={handleChange} />
//                 <input type="text" name="category" value={eventData.category} onChange={handleChange} />
//                 <input type="text" name="category" value={eventData.category} onChange={handleChange} />
//             </form>
//         </div>
//     )
// }