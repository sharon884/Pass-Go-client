// src/components/HostComponets/EditEvent/EditEventModalWrapper.jsx

"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import eventValidationSchema from "../../../utils/hostRelatedValidations/EventAddingValidation";
import api from "../../../utils/api/api";
import { toast } from "sonner";
import { CheckCircle, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEventDetailsById,
  updateEventById,
} from "../../../services/host/hostEventServices";
import EventDetailsForm from "../AddEvent/EventDetailsForm";
import TicketDetailsForm from "../AddEvent/TicketDetailsForm";
import BussinessInfoForm from "../AddEvent/BussinessInfoFrom";
import ReviewSubmit from "../AddEvent/ReviewSubmit";

const EditEventModalWrapper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { eventId } = useParams(); // Get event ID from URL
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(eventValidationSchema),
    mode: "onTouched",

    defaultValues: {},
  });

  const { handleSubmit, getValues, reset } = methods;

  //  FETCH EXISTING EVENT DATA
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setIsLoading(true);

        const response = await getEventDetailsById(eventId);

        const { success, event } = response;

        if (success) {
          const transformedData = {
            ...event,
            location: event.locationName,
            coordinates: {
              lat: event.location.coordinates[1],
              lng: event.location.coordinates[0],
            },
          };

      
          reset(transformedData);
        } else {
          toast.error("Failed to fetch event details.");
          navigate("/host/dashboard");
        }
      } catch (error) {
         toast.error("An error occurred while fetching event data.");
        console.error("Fetch error:", error);
        navigate("/host/events");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventData();
  }, [eventId, reset, navigate]);

 
  const steps = [
    { label: "Event Details", component: <EventDetailsForm /> },
    { label: "Ticket Info", component: <TicketDetailsForm /> },
    { label: "Business Info", component: <BussinessInfoForm /> },
    {
      label: "Review & Update",
      component: <ReviewSubmit goToStep={setCurrentStep} />,
    },
  ];

  //  ONSUBMIT HANDLER FOR UPDATING
  const onSubmit = async (formData) => {
    
    const { location: locationName, coordinates, ...rest } = formData;
    const geoJsonLocation = {
      type: "Point",
      coordinates: coordinates ? [coordinates.lng, coordinates.lat] : [],
    };
    const dataToSend = {
      ...rest,
      location: geoJsonLocation,
      locationName: locationName,
    };

    console.log("Submitting updated data:", dataToSend);
    toast.info("Updating event...");

    try {
      const response = await updateEventById(eventId, dataToSend);

      if (response.success) {
        toast.success("Event updated successfully!");
        navigate("/host/events");
      } else {
        toast.error(response.message || "Something went wrong during update.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update event.");
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  // The handleNext logic is identical to  original component
  const { trigger } = methods;
  const handleNext = async () => {
    let fieldsToValidate = [];
    if (currentStep === 0)
      fieldsToValidate = [
        "title",
        "description",
        "category",
        "location",
        "date",
        "time",
        "images",
        "eventType",
      ];
    else if (currentStep === 1) {
      if (getValues().eventType !== "free")
        fieldsToValidate = [
          "tickets.VIP.price",
          "tickets.VIP.quantity",
          "tickets.general.price",
          "tickets.general.quantity",
        ];
    } else if (currentStep === 2)
      fieldsToValidate = [
        "businessInfo.name",
        "businessInfo.email",
        "businessInfo.mobile",
      ];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      toast.error("Please fill all required fields correctly");
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading event for editing...</div>;
  }

  // The JSX structure for progress bar and navigation is the same
  const isLastStep = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      {/* Progress Tracker */}
      <div className="mb-8">
        {/* Progress Bar JSX is copied from your original file */}
        <div className="flex justify-between mb-2">{/* ... */}</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-[#5C3BFE] h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">
          {progress.toFixed(0)}% completed
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Editing: {steps[currentStep].label}
            </h2>
          </div>
          <div className="min-h-[400px]">{steps[currentStep].component}</div>
          <div className="flex justify-between pt-4 border-t mt-8">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="flex items-center px-4 py-2 text-[#5C3BFE] border border-[#5C3BFE] rounded-lg hover:bg-[#5C3BFE]/10"
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
                className="flex items-center px-6 py-2 bg-[#5C3BFE] text-white rounded-lg hover:bg-[#4C2BEE]"
              >
                Next <ChevronRight size={18} className="ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-6 py-2 bg-[#5C3BFE] text-white rounded-lg hover:bg-[#4C2BEE]"
              >
                Update Event <Save size={18} className="ml-2" />
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditEventModalWrapper;
