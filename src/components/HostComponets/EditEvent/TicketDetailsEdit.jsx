// import React from 'react';
// import { useFormContext } from "react-hook-form";
// import { CreditCard, Hash, Ticket } from "lucide-react";

// function TicketDetailsEdit() {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div>
//       {/* VIP Ticket Section */}
//       <div>
//         <h2>
//           <Ticket /> VIP Ticket
//         </h2>
//         <div>
//           <label>
//             <CreditCard /> Price
//           </label>
//           <input
//             type="number"
//             step="0.01"
//             placeholder="0.00"
//             {...register("tickets.VIP.price", { valueAsNumber: true })}
//           />
//           {errors.tickets?.VIP?.price && (
//             <p>{errors.tickets.VIP.price.message}</p>
//           )}

//           <label>
//             <Hash /> Quantity
//           </label>
//           <input
//             type="number"
//             placeholder="0"
//             {...register("tickets.VIP.quantity", { valueAsNumber: true })}
//           />
//           {errors.tickets?.VIP?.quantity && (
//             <p>{errors.tickets.VIP.quantity.message}</p>
//           )}
//         </div>
//       </div>

//       {/* General Ticket Section */}
//       <div>
//         <h2>
//           <Ticket /> General Tickets
//         </h2>
//         <div>
//           <label>
//             <CreditCard /> Price
//           </label>
//           <input
//             type="number"
//             step="0.01"
//             placeholder="0.00"
//             {...register("tickets.general.price", { valueAsNumber: true })}
//           />
//           {errors.tickets?.general?.price && (
//             <p>{errors.tickets.general.price.message}</p>
//           )}

//           <label>
//             <Hash /> Quantity
//           </label>
//           <input
//             type="number"
//             placeholder="0"
//             {...register("tickets.general.quantity", { valueAsNumber: true })}
//           />
//           {errors.tickets?.general?.quantity && (
//             <p>{errors.tickets.general.quantity.message}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TicketDetailsEdit;
