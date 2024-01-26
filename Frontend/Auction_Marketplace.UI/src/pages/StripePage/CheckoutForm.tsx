import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function CheckForm(){

  const stripe = useStripe();
  const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async(e : any) => {
        e.preventDefault();

        if(!stripe || !elements){
          return;
        }

        setIsProcessing(true);

        const {error} = await stripe.confirmPayment({
          elements,
          confirmParams:{
            return_url: `${window.location.origin}`,  //Todo: Fix the urls!!!!
          },
        });

        if(error){
          setMessage(error.message ?? null);
        }

        setIsProcessing(false);
    }

    return(
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement/>
          <button disabled={isProcessing} id="submit">
            <span id="button-text">
                {isProcessing ? "Processing" : "Pay Now"}
            </span>
          </button>

          {message && <div id="payment-message">{message}</div>}
        </form>
    );
}