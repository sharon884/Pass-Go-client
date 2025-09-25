// import React from 'react';
// import { useFormContext } from 'react-hook-form';

// function ReviewSubmit({goToStep}) {
//     const { getValues } = useFormContext();
//     const values = getValues();
//   return (
//     <div>
//       <h2>Review youe event</h2>
      
//         <div>
//             <section>

 
//             <h4>Event Details</h4>
//             <button onClick={()=> goToStep(1)}> Edit </button>
//             <div>
//                 <h2>Title : {values.title}</h2>
//                 <p>Category : {values.category}</p>
//                 <p>Location : {values.location}</p>
//                 <p>Date : {values.date}</p>
//                 <p>Time : {values.time}</p>
//                 <div>
//                     <p>Description</p>
//                     <p>{values.description}</p>
//                 </div>
//             </div>
//             <div>
//                 { values.images.length > 0 && (
//                     <div>
//                         <p>Images</p>
//                         <div>
//                             {values.images.map(( url , index ) => (
//                                 <div key={index}>
//                                     <img src={url} alt={`Event${index+1}`} />

//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//                        </section>
//                        <section>
//                         <div>
//                             <h4>Ticket Details</h4>
//                             <button onClick={()=> goToStep(2)}>Edit</button>

//                         </div>
//                         <div>
//                             {["VIP", "general"].map((type)=> (
//                                 <div key={type}>
//                                     <h5>{type.toUpperCase()} Tickets</h5>
//                                     <p>Price : {values.tickets?.[type]?.price}</p>
//                                     <p>Quantity : {values.tickets?.[type]?.quantity}</p>
//                                     <p>
//                                         Total value : {(values.tickets?.[type]?.price || 0) * (values.tickets?.[type]?.quantity || 0)}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                        </section>

//                        <section>
//                         <div>
//                             <h4>
//                                 Bussiness Info
//                             </h4>
//                             <button onClick={()=> goToStep(3)}> Edit</button>
//                         </div>
//                         <div>
//                             <p>Name : {values.businessInfo?.name}</p>
//                             { values.businessInfo?.organization_name && (
//                                 <p>{values.businessInfo.organization_name}</p>
//                             )}
//                             <p>{values.businessInfo?.email}</p>
//                             <p>{values.businessInfo?.mobile}</p>
//                         </div>
//                        </section>
//                        <div>
//                         <button>send request for updating </button>
//                        </div>
//         </div>
//     </div>
//   )
// }

// export default ReviewSubmit
