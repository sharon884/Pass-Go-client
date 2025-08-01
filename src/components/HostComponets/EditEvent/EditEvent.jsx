"use client"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import eventValidationSchema from "../../../utils/hostRelatedValidations/EventAddingValidation"
import { updateEventById } from "../../../services/host/hostEventServices"
import { getEventDetailsById } from "../../../services/host/hostEventServices"
import { toast } from "sonner"
import EventDetailsEdit from "./EventDetailsEdit"
import TicketDetailsEdit from "./TicketDetailsEdit"
import BusinessInfoEdit from "./BusinessInfoEdit"
import ReviewSubmit from "./ReviewSubmit"

function EditEvent() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const methods = useForm({
    resolver: zodResolver(eventValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      images: [],
      location: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
      date: "",
      time: "",
      tickets: {
        VIP: {
          price: 0,
          quantity: 0,
        },
        general: {
          price: 0,
          quantity: 0,
        },
      },
      businessInfo: {
        name: "",
        organization_name: "",
        email: "",
        mobile: "",
      },
    },
  })

  const { reset, handleSubmit } = methods

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventDetailsById(eventId)
        console.log(response)
        if (response.success) {
          // 🔥 FIXED: Transform GeoJSON data for form
          const eventData = response.data.event
          const formData = {
            ...eventData,
            location: eventData.locationName || eventData.location || "",
            coordinates: {
              lat: eventData.location?.coordinates?.[1] || 0,
              lng: eventData.location?.coordinates?.[0] || 0,
            },
          }
          reset(formData)
        } else {
          toast.error(response.message || "Failed to load event")
        }
      } catch (error) {
        toast.error("Something went wrong while fetching event")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [eventId, reset])

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      // 🔥 FIXED: Transform form data to include GeoJSON
      const submitData = {
        ...data,
        locationName: data.location,
        location: {
          type: "Point",
          coordinates: [data.coordinates.lng, data.coordinates.lat],
        },
      }
      delete submitData.coordinates // Remove coordinates from root level

      const response = await updateEventById(eventId, submitData)
      if (response.success) {
        toast.success("Event updated successfully!")
        navigate("/Host-Events")
      } else {
        toast.error(response.message || "Update failed")
      }
    } catch (error) {
      toast.error("Something went wrong during update")
    } finally {
      setSubmitting(false)
    }
  }

  const handleNext = async () => {
    const isStepValid = await methods.trigger() // validate current step
    if (isStepValid) {
      setStep(step + 1)
    }
  }

  const stepTitles = ["Event Details", "Ticket Information", "Business Information", "Review & Submit"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 relative mb-8">
          <div className="absolute top-0 right-0 bottom-0 left-0 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Event Details</h2>
          <p className="text-gray-600">Please wait while we fetch your event information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/Host-Events")}
              className="mr-6 p-3 text-gray-600 hover:text-purple-600 hover:bg-white/80 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center">
                <svg className="w-10 h-10 mr-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Event
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Update your event information with ease</p>
            </div>
          </div>

          {/* Enhanced Progress Steps */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <div className="flex items-center justify-between">
              {stepTitles.map((title, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        step > index + 1
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                          : step === index + 1
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-110"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step > index + 1 ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="ml-4 hidden sm:block">
                      <p
                        className={`text-sm font-semibold transition-colors ${
                          step === index + 1 ? "text-purple-600" : step > index + 1 ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {title}
                      </p>
                      <p className="text-xs text-gray-400">Step {index + 1}</p>
                    </div>
                  </div>
                  {index < stepTitles.length - 1 && (
                    <div
                      className={`hidden sm:block w-20 h-2 mx-6 rounded-full transition-all duration-500 ${
                        step > index + 1 ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Form Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 sm:p-10">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Enhanced Step Title */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{stepTitles[step - 1]}</h2>
                    <p className="text-gray-600 mt-2">
                      Step {step} of {stepTitles.length} - Complete all fields to continue
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Progress</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round((step / stepTitles.length) * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="min-h-[500px]">
                {step === 1 && <EventDetailsEdit />}
                {step === 2 && <TicketDetailsEdit />}
                {step === 3 && <BusinessInfoEdit />}
                {step === 4 && <ReviewSubmit goToStep={setStep} />}
              </div>

              {/* Enhanced Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                <div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Continue
                      <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {submitting ? (
                        <>
                          <div className="w-6 h-6 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Updating Event...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Update Event
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default EditEvent
