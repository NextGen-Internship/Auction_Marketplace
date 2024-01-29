import {useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckForm from "./CheckoutForm";

function Payment() {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchStripeKeys = async () => {
      try {
        var a = await loadStripe("pk_test_51ObkXKJrf8KR40wbZtUyrRm5hute8V5k8UOTlOzaKI5MkjNzDzKPV2aggIykCLyG4tznibC64I9tuD3Z5WKcM1zD000gqODeB8");
        setStripePromise(a);
      } catch (error) {
        console.error("Error fetching Stripe keys:", error);
      }
    };

    fetchStripeKeys();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("https://localhost:7141/api/CheckoutApi/create-session", {
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