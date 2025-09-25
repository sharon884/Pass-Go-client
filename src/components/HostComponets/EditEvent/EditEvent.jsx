// "use client"
// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { useForm, FormProvider } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import eventValidationSchema from "../../../utils/hostRelatedValidations/EventAddingValidation"
// import { updateEventById } from "../../../services/host/hostEventServices"
// import { getEventDetailsById } from "../../../services/host/hostEventServices"
// import { toast } from "sonner"

// import EventDetailsEdit from "./EventDetailsEdit"
// import TicketDetailsEdit from "./TicketDetailsEdit"
// import BusinessInfoEdit from "./BusinessInfoEdit"
// import ReviewSubmit from "./ReviewSubmit"

// function EditEvent() {
//   const { eventId } = useParams()
//   const navigate = useNavigate()

//   const [step, setStep] = useState(1)
//   const [loading, setLoading] = useState(true)
//   const [submitting, setSubmitting] = useState(false)

//   const methods = useForm({
//     resolver: zodResolver(eventValidationSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       category: "",
//       images: [],
//       location: "",
//       date: "",
//       time: "",
//       tickets: {
//         VIP: {
//           price: 0,
//           quantity: 0,
//         },
//         general: {
//           price: 0,
//           quantity: 0,
//         },
//       },
//       businessInfo: {
//         name: "",
//         organization_name: "",
//         email: "",
//         mobile: "",
//       },
//     },
//   })

//   const { reset, handleSubmit } = methods

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getEventDetailsById(eventId)
//         console.log(response)
//         if (response.success) {
//           reset(response.event)
//         } else {
//           toast.error(response.message || "Failed to load event")
//         }
//       } catch (error) {
//         toast.error("Something went wrong while fetching event")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [eventId, reset])

//   const onSubmit = async (data) => {
//     setSubmitting(true)
//     try {
//       const response = await updateEventById(eventId, data)
//       if (response.success) {
//         toast.success("Event updated successfully!")
//         navigate("/Host-Events")
//       } else {
//         toast.error(response.message || "Update failed")
//       }
//     } catch (error) {
//       toast.error("Something went wrong during update")
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const handleNext = async () => {
//     const isStepValid = await methods.trigger() // validate current step
//     if (isStepValid) {
//       setStep(step + 1)
//     }
//   }

//   const stepTitles = ["Event Details", "Ticket Information", "Business Information", "Review & Submit"]

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//         <div className="w-16 h-16 relative mb-6">
//           <div className="absolute top-0 right-0 bottom-0 left-0 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
//         </div>
//         <h2 className="text-xl font-semibold text-gray-700">Loading event details...</h2>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center mb-4">
//             <button
//               onClick={() => navigate("/Host-Events")}
//               className="mr-4 p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center">
//                 <svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                   />
//                 </svg>
//                 Edit Event
//               </h1>
//               <p className="text-gray-600 mt-1">Update your event information</p>
//             </div>
//           </div>

//           {/* Progress Steps */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between">
//               {stepTitles.map((title, index) => (
//                 <div key={index} className="flex items-center">
//                   <div className="flex items-center">
//                     <div
//                       className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
//                         step > index + 1
//                           ? "bg-green-500 text-white"
//                           : step === index + 1
//                             ? "bg-purple-600 text-white"
//                             : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {step > index + 1 ? (
//                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       ) : (
//                         index + 1
//                       )}
//                     </div>
//                     <div className="ml-3 hidden sm:block">
//                       <p className={`text-sm font-medium ${step === index + 1 ? "text-purple-600" : "text-gray-500"}`}>
//                         {title}
//                       </p>
//                     </div>
//                   </div>
//                   {index < stepTitles.length - 1 && (
//                     <div
//                       className={`hidden sm:block w-16 h-1 mx-4 rounded ${
//                         step > index + 1 ? "bg-green-500" : "bg-gray-200"
//                       }`}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
//           <FormProvider {...methods}>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               {/* Current Step Title */}
//               <div className="border-b border-gray-200 pb-4">
//                 <h2 className="text-xl font-semibold text-gray-900">{stepTitles[step - 1]}</h2>
//                 <p className="text-gray-600 mt-1">
//                   Step {step} of {stepTitles.length}
//                 </p>
//               </div>

//               {/* Step Content */}
//               <div className="min-h-[400px]">
//                 {step === 1 && <EventDetailsEdit />}
//                 {step === 2 && <TicketDetailsEdit />}
//                 {step === 3 && <BusinessInfoEdit />}
//                 {step === 4 && <ReviewSubmit goToStep={setStep} />}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex items-center justify-between pt-6 border-t border-gray-200">
//                 <div>
//                   {step > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => setStep(step - 1)}
//                       className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg font-medium transition-colors"
//                     >
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//                       </svg>
//                       Back
//                     </button>
//                   )}
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   {step < 4 ? (
//                     <button
//                       type="button"
//                       onClick={handleNext}
//                       className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
//                     >
//                       Next
//                       <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                       </svg>
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={submitting}
//                       className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors shadow-sm hover:shadow-md disabled:cursor-not-allowed"
//                     >
//                       {submitting ? (
//                         <>
//                           <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Updating...
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                           </svg>
//                           Update Event
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </FormProvider>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EditEvent