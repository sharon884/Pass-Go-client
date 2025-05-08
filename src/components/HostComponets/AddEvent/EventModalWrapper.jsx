import React, { useState } from "react";
import { useForm , FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import eventValidationSchema from "../../../utils/hostRelatedValidations/EventAddingValidation";
import api from "../../../utils/api/api";
import EventDetailsForm from "./EventDetailsForm";
import TicketDetailsForm from "./TicketDetailsForm";
import BussinessInfoForm from "./BussinessInfoFrom";
import ReviewSubmit from "./ReviewSubmit";
import { toast } from "react-toastify";


const EventModalWrapper = () => {
    const [ currentStep , setCurrentStep ] = useState(0);
    const methods = useForm({
        resolver : zodResolver(eventValidationSchema),
        mode : "onTouched",
        defaultValues : {
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
    });
    

    const { handleSubmit, getValues } = methods;
    
const steps = [
    { label: "Event Details", component: <EventDetailsForm /> },
    { label: "Ticket Info", component: <TicketDetailsForm /> },
    { label: "Business Info", component: <BussinessInfoForm /> },
    { label: "Review & Submit", component: <ReviewSubmit goToStep={setCurrentStep} /> },
];

    const onSubmit = async ( data ) => {
        console.log("Final submit data", data);
        
        try {
                const response = await api.post("/host/event/eventadd", data );
                if (response.data.success) {
                    toast.success("Event added successfully");
                } else {
                    toast.error(response.data.message || "Something went wrong");
                }
        } catch ( error ) {
            console.log("event adding failed ", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const { trigger } = methods;

    const handleNext = async () => {
        const isStepValid = await trigger(["title", "description", "category", "location", "date", "time"]);             
        if( isStepValid ) {
            setCurrentStep((prev) => prev + 1);
        }
    }

    const isLastStep = currentStep === steps.length -1;

    return (
        <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)} >
                <h2>{steps[currentStep].label}</h2>
                {steps[currentStep].component}
                <div>
                    {currentStep > 0 && (
                        <button type="button" onClick={()=>setCurrentStep((prev) => prev -1 )}>
                            Back
                        </button>
                    )}
                    {!isLastStep ? (
                        <button type="button" onClick={handleNext}>
                               Next
                        </button>
                    ) : (
                        <button type="submit"> Submit for request  </button>
                    )}
                </div>
                <p>{((currentStep +1 ) / steps.length) * 100} % completed </p>
            </form>
        </FormProvider>
    );

};

export default EventModalWrapper;
