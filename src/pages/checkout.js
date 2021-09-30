import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import useSessionStorage from "../hooks/useStorage";

const CheckoutPage = ({ location }) => {
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [accessToken, setAccessToken] = useSessionStorage("gh:access:token");
  const checkoutDone = useRef(false);

  useEffect(() => {
    const checkout = async () => {
      try {
        setMessage("");
        setStatus("pending");

        const {
          data: { url, message },
        } = await axios.post("/api/checkout", {
          accessToken: accessToken,
          cancelUrl: `${location.origin}/`,
          successUrl: `${location.origin}/success/?sessionId={CHECKOUT_SESSION_ID}`,
        });

        if (url) {
          window.location = url;
        }
        setStatus("failed");
        setMessage(message);
      } catch (error) {
        setMessage(error.response?.data?.message || error.message);
        setStatus("failed");
      }
    };

    if (accessToken && !checkoutDone.current) {
      checkout();
      checkoutDone.current = true;
    }
  }, [accessToken, location.origin, setAccessToken]);

  return (
    <main>
      <p>
        {status === "pending" && <>Calling Stripe...</>}
        {status === "failed" && <>Hold up!</>}
        {message && (
          <>
            <br />
            <small>{message}</small>
          </>
        )}
      </p>
    </main>
  );
};

export default CheckoutPage;
