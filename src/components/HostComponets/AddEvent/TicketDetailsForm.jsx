import React from "react";
import { useFormContext } from "react-hook-form";

const TicketDetailsForm = () => {
    const {
        register, 
        formState : { errors },
    } = useFormContext();

    return (
        <div>
            
            <h2>VIP Ticket</h2>
            <div>
                <label>Price</label>
                <input type="number" step="0.01" {...register("tickets.VIP.price", { valueAsNumber : true })} />
                {errors.tickets ?.VIP?.price && (
                    <p>{errors.tickets?.VIP.price.message}</p>
                )}
            </div>
            <div>
                <label>Quantity</label>
                <input type="number" {...register("tickets.VIP.quantity", { valueAsNumber : true})} />
                {errors.tickets?.VIP?.quantity && (
                    <p>{errors.tickets.VIP.quantity.message}</p>
                )}
            </div>
               <div>
                <h2>General Tickets</h2>
                <div>
                    <label>Price</label>
                    <input type="number" step="0.01" {...register("tickets.general.price", {valueAsNumber : true })} />
                    { errors.tickets?.general?.price && (
                        <p>{errors.tickets.general.price.message}</p>
                    )}
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" {...register("tickets.general.quantity", {valueAsNumber : true })} />
                    {errors.tickets?.general?.quantity && (
                        <p>{errors.tickets.general.quantity.message}</p>
                    )}

                </div>

               </div>
          
        </div>

    );
};

export default TicketDetailsForm;