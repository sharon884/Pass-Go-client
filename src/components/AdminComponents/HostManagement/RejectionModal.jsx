import { useState } from "react";

const RejectionModal = ({isOpen, onClose, onSubmit}) => {

    const [ reason , setReason ] = useState("");

    const handleSubmit = () => {
        if ( reason.trim() ) {
            onSubmit(reason);
            setReason("");
        } 
    };

    if ( !isOpen ) return null;

    return (
        <div>
            <h2>Rejection Reason</h2>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Type the reason here..."/>
                <div>
                    <button onClick={onClose}>
                        cancel
                    </button>
                    <button onClick={handleSubmit}>
                           Submit
                    </button>
                </div>
        </div>
    );
};

export default RejectionModal;