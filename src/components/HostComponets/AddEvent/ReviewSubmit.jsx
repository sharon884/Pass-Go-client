
import React from 'react'
import { useFormContext  } from 'react-hook-form';


function ReviewSubmit({goToStep}) {
    const { getValues } = useFormContext();
    const data = getValues();
  return (
    <div>
      <h3>Review Your Event Details</h3>
      <section>
        <h4>Event Details</h4>
        <h4>Event Details <button onClick={() => goToStep(0)}>Edit</button></h4>
        <p>Title : {data.title}</p>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Category:</strong> {data.category}</p>
        <p><strong>Location:</strong> {data.location}</p>
        <p><strong>Date:</strong> {data.date}</p>
        <p><strong>Time:</strong> {data.time}</p>
        <div>
            Images :
            <div>
                {data.images?.map((url,index)=> (
                    <img key={index} src={url} alt={`Event ${index}`} />
                ))}
            </div>
        </div>
      </section>

      <hr />
      <section>
        <h4>Ticket Details</h4>
        <h4>Ticket Details <button onClick={() => goToStep(1)}>Edit</button></h4>
        <p><strong>VIP Price:</strong> ₹{data.tickets?.VIP?.price}</p>
        <p><strong>VIP Quantity:</strong> {data.tickets?.VIP?.quantity}</p>
        <p><strong>General Price:</strong> ₹{data.tickets?.general?.price}</p>
        <p><strong>General Quantity:</strong> {data.tickets?.general?.quantity}</p>

      </section>

      <hr />
      <section>
      <h4>🏢 Business Info</h4>
        <h4>🏢 Business Info <button onClick={() => goToStep(2)}>Edit</button></h4>
        <p><strong>Name:</strong> {data.businessInfo?.name}</p>
        <p><strong>Email:</strong> {data.businessInfo?.email}</p>
        <p><strong>Mobile:</strong> {data.businessInfo?.mobile}</p>

      </section>
      
      <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
        Please verify all information before submitting the event.
      </p>
    </div>
  )
}

export default ReviewSubmit
