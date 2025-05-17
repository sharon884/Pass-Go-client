"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import eventValidationSchema from "../../../utils/hostRelatedValidations/EventAddingValidation"
import api from "../../../utils/api/api"
import EventDetailsForm from "./EventDetailsForm"
import TicketDetailsForm from "./TicketDetailsForm"
import BussinessInfoForm from "./BussinessInfoFrom"
import ReviewSubmit from "./ReviewSubmit"
import { toast } from "react-toastify"
import { CheckCircle, ChevronLeft, ChevronRight, Send } from "lucide-react"

const EventModalWrapper = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const methods = useForm({
    resolver: zodResolver(eventValidationSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      category: "",
      images: [],
      location: "",
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

  const { handleSubmit, getValues } = methods

  const steps = [
    { label: "Event Details", component: <EventDetailsForm /> },
    { label: "Ticket Info", component: <TicketDetailsForm /> },
    { label: "Business Info", component: <BussinessInfoForm /> },
    { label: "Review & Submit", component: <ReviewSubmit goToStep={setCurrentStep} /> },
  ]

  const onSubmit = async (data) => {
    console.log("Final submit data", data)

    try {
      const response = await api.post("/host/event/eventadd", data)
      if (response.data.success) {
        toast.success("Event added successfully!")
      } else {
        toast.error(response.data.message || "Something went wrong")
      }
    } catch (error) {
      console.log("event adding failed ", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Failed to add event. Please try again.")
    }
  }

  const { trigger } = methods

  const handleNext = async () => {
    let fieldsToValidate = []

    if (currentStep === 0) {
      fieldsToValidate = ["title", "description", "category", "location", "date", "time", "images"]
    } else if (currentStep === 1) {
      fieldsToValidate = [
        "tickets.VIP.price",
        "tickets.VIP.quantity",
        "tickets.general.price",
        "tickets.general.quantity",
      ]
    } else if (currentStep === 2) {
      fieldsToValidate = ["businessInfo.name", "businessInfo.email", "businessInfo.mobile"]
    }

    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo(0, 0)
    } else {
      toast.error("Please fill all required fields correctly")
    }
  }

  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      {/* Progress Tracker */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${index <= currentStep ? "text-[#5C3BFE]" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  index < currentStep
                    ? "bg-[#5C3BFE] text-white"
                    : index === currentStep
                      ? "border-2 border-[#5C3BFE] text-[#5C3BFE]"
                      : "border-2 border-gray-200 text-gray-400"
                }`}
              >
                {index < currentStep ? <CheckCircle size={16} /> : index + 1}
              </div>
              <span className="text-xs hidden sm:block">{step.label}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-[#5C3BFE] h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">{progress.toFixed(0)}% completed</p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep].label}</h2>
          </div>

          <div className="min-h-[400px]">{steps[currentStep].component}</div>

          <div className="flex justify-between pt-4 border-t mt-8">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="flex items-center px-4 py-2 text-[#5C3BFE] border border-[#5C3BFE] rounded-lg hover:bg-[#5C3BFE]/10 transition-colors"
              >
                <ChevronLeft size={18} className="mr-1" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {!isLastStep ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-[#5C3BFE] text-white rounded-lg hover:bg-[#4C2BEE] transition-colors"
              >
                Next <ChevronRight size={18} className="ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-6 py-2 bg-[#5C3BFE] text-white rounded-lg hover:bg-[#4C2BEE] transition-colors"
              >
                Submit Request <Send size={18} className="ml-2" />
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default EventModalWrapper
