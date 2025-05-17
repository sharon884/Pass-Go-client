// Event Editing Main Component
import React from "react";
import { useEffect , useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import eventValidationSchema from "../../../utils/hostRelatedValidations/EventAddingValidation";
import { updateEventById } from "../../../services/host/hostEventServices";
import { getEventDetailsById } from "../../../services/host/hostEventServices" 
import { toast } from "sonner";

import EventDetailsEdit from './EventDetailsEdit';
import TicketDetailsEdit from './TicketDetailsEdit';
import BusinessInfoEdit from './BusinessInfoEdit';
import ReviewSubmit from './ReviewSubmit';

function EditEvent() {

    const { eventId } = useParams();
    const navigate = useNavigate();

    const [ step , setStep ] = useState(1);
    const [ loading, setLoading ] = useState(true);
    const [submitting, setSubmitting] = useState(false);
  

    const methods = useForm({
        resolver : zodResolver(eventValidationSchema),
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
    });

    const { reset , handleSubmit } = methods;

    useEffect (()=> {
        const fetchData = async () => {
            try {
                const response = await getEventDetailsById(eventId);
                console.log(response);
                if ( response.success ) {
               reset(response.event);
                } else {
                    toast.error(response.message || "Failed to load event");
                }
            } catch ( error ) {
                toast.error("Something went wrong while fetching event");
            }finally {
                setLoading(false);
            }
        }
        fetchData();
    },[ eventId, reset ]);

    const onSubmit = async ( data ) => {
        setSubmitting(true);
        try {
            const response = await updateEventById( eventId, data );
            if ( response.success ) {
                toast.success("Event updated successfully!");
                navigate("/Host-Events");
            } else {
                toast.error(response.message || "update failed");
            }
        } catch ( error ) {
            toast.error("something went wrong during update");
        }finally {
            setSubmitting(false);
        }
    };

    const handleNext = async () => {
  const isStepValid = await methods.trigger(); // validate current step
  if (isStepValid) {
    setStep(step + 1);
  }
};


    if ( loading ) return <div>Loading...</div>
  return (
    <div>
  <FormProvider {...methods} >
    <form onSubmit={ handleSubmit(onSubmit)} >
        {step === 1 && <EventDetailsEdit/>}
        { step === 2 && <TicketDetailsEdit/> }
        { step === 3 && <BusinessInfoEdit/> }
        { step === 4 && <ReviewSubmit goToStep={setStep}/> }

        <div>
            { step > 1 && (
                <button type='button' onClick={()=> setStep( step - 1)}> Back </button>
            )}
            { step < 4 ? (
                <button type='button' onClick={handleNext}>
                    Next
                </button>
            ) : (
                <button type='submit' disabled={submitting}>{submitting ? "updating...":"Update Event"}</button>
            )}
        </div>

    </form>
     
    </FormProvider>    
    </div>
  )
}

export default EditEvent;
