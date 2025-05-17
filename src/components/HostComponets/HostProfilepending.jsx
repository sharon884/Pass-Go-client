// // HostProfile.jsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchHostProfile }  from '../../features/auth/authThunk';
// import { useNavigate } from 'react-router-dom';

// // npm install react-toastify
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const HostProfile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, loading, error } = useSelector((state) => state.auth);
  
//   useEffect(() => {
//     dispatch(fetchHostProfile())
//       .unwrap()
//       .then(() => {
//         toast.success('Profile loaded successfully!');
//       })
//       .catch((error) => {
//         toast.error(error || 'Failed to load profile');
//       });
//   }, [dispatch]);

//   const handleUpdateProfile = () => {
//     toast.info('Update profile feature coming soon!');
//   };
//  const handleChangePassword = () => {
//   navigate("/profile/change-password-host")
//  }
//   const handleVerificationRequest = () => {
//     toast.info('Verification request sent!');
//   };

//   // Button component for reusability
//   const Button = ({ onClick, children, secondary = false, className = '' }) => (
//     <button
//       onClick={onClick}
//       className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
//         secondary 
//           ? 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50' 
//           : 'bg-indigo-600 text-white hover:bg-indigo-700'
//       } ${className}`}
//     >
//       {children}
//     </button>
//   );

//   // Badge component for status
//   const StatusBadge = ({ isVerified }) => (
//     <span className={`px-3 py-1 text-xs font-medium rounded-full ${
//       isVerified 
//         ? 'bg-green-100 text-green-800' 
//         : 'bg-yellow-100 text-yellow-800'
//     }`}>
//       {isVerified ? 'Verified' : 'Not Verified'}
//     </span>
//   );

//   // Loading spinner component
//   const LoadingSpinner = () => (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//     </div>
//   );

//   // Error component
//   const ErrorDisplay = ({ message }) => (
//     <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//       <p className="font-medium">Unable to load profile</p>
//       <p className="text-sm">{message || 'Please try again later'}</p>
//     </div>
//   );

//   // Info row component
//   const InfoRow = ({ label, value }) => (
//     <div className="mb-4">
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className="font-medium">{value || 'Not provided'}</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
//       <ToastContainer position="top-right" autoClose={3000} />

      
//       <div className="max-w-md mx-auto">
//         <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//           {/* Header with gradient */}
//           <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
//             <h1 className="text-2xl font-bold text-white text-center">Host Profile</h1>
//           </div>
          
//           {/* Content */}
//           <div className="px-6 py-6">
//             {loading ? (
//               <LoadingSpinner />
//             ) : error ? (
//               <ErrorDisplay message={error} />
//             ) : (
//               <>
//                 {/* Profile Image */}
//                 <div className="flex justify-center -mt-12 mb-6">
//                   <div className="relative">
//                     <img
//                       src={user.profile_img || 'https://via.placeholder.com/128?text=Host'}
//                       alt="Profile"
//                       className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
//                     />
//                     <div className="absolute bottom-0 right-0">
//                       <StatusBadge isVerified={user.isVerified} />
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* User Name */}
//                 <h2 className="text-xl font-bold text-center mb-6">{user.name}</h2>
                
//                 {/* User Info */}
//                 <div className="bg-gray-50 rounded-xl p-4 mb-6">
//                   <InfoRow label="Email" value={user.email} />
//                   <InfoRow label="Mobile" value={user.mobile} />
//                   <InfoRow label="Role" value={user.role} />
//                   <InfoRow label="ID" value={user.id} />
//                 </div>
                
//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   <Button onClick={handleUpdateProfile} className="w-full">
//                     Update Profile
//                   </Button>
                  
//                   <Button 
//                    onClick={handleChangePassword}
//                     secondary 
//                     className="w-full"
//                   >
//                     Change Password
//                   </Button>
                  
//                   {!user.isVerified && (
//                     <Button 
//                       onClick={handleVerificationRequest}
//                       className="w-full bg-yellow-500 hover:bg-yellow-600"
//                     >
//                       Send Verification Request
//                     </Button>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
        
//         {/* Additional Info Card */}
//         <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
//           <h3 className="font-bold text-lg mb-3">Host Benefits</h3>
//           <ul className="space-y-2">
//             <li className="flex items-start">
//               <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//               <span>Create and manage unlimited events</span>
//             </li>
//             <li className="flex items-start">
//               <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//               <span>Access to detailed analytics and reports</span>
//             </li>
//             <li className="flex items-start">
//               <svg className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//               <span>Faster payouts and premium support</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HostProfile;