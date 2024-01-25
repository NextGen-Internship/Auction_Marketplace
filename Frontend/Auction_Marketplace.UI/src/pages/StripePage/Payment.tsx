import {useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckForm from "./CheckoutForm";

function Payment(props: any) {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchStripeKeys = async () => {
      try {
        const response = await fetch("https://your-backend-api/api/stripe-keys");
        const { publishableKey } = await response.json();

        setStripePromise(await loadStripe(publishableKey));
        console.log(publishableKey);
      } catch (error) {
        console.error("Error fetching Stripe keys:", error);
      }
    };

    fetchStripeKeys();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("https://your-backend-api/api/client-secret", {
          method: "POST",
          body: JSON.stringify({}),
        });
        const { clientSecret } = await response.json();

        setClientSecret(clientSecret);
        console.log(clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  return (
    <>
      <h1>React Stripe Integration</h1>
      {stripePromise && clientSecret &&(
      <Elements stripe={stripePromise}  options={ {clientSecret} }>
        <CheckForm />
      </Elements>
      )}
    </>
  );
}

export default Payment;