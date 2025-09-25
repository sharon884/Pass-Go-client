// import React from 'react';
// import {  AtSign, Building, Phone, User } from "lucide-react";
// import { useFormContext } from 'react-hook-form';


// function BusinessInfoEdit() {
//     const {
//         register, 
//         formState : { errors },
//     } = useFormContext();
//   return (
//     <div>
//         <div>
//         <label ><User/> Event conducting person Name (for contacting users)</label>
//       <input type="text" {...register("businessInfo.name")} placeholder='Name' />
//       { errors.businessInfo?.name && (
//        <p>{errors.businessInfo.name.message}</p>
//       )}
//       </div>
//       <div>
//         <label><Building/>Organization Name</label>
//         <input type="text" {...register("businessInfo.organization_name")} placeholder='Your organization name' />
//         { errors.businessInfo?.organization_name && (
//             <p>{errors.businessInfo.organization_name.message}</p>
//         )}
//       </div>
//       <div>
//         <label ><AtSign/>Email</label>
//         <input type="email" {...register('businessInfo.email')} placeholder='"contact@yourbusiness.com' />
//         { errors.businessInfo?.email && (
//             <p>{errors.businessInfo.email.message}</p>
//         )}
//       </div>
//       <div>
//         <label><Phone/>Mobile</label>
//         <input type="text" {...register("businessInfo.mobile")} placeholder='+91 1234567890' />
//         { errors.businessInfo?.mobile && (
//             <p>{errors.businessInfo.mobile.message}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BusinessInfoEdit;
