import React, { useEffect, useRef, useState } from "react";
import { navigate } from "gatsby";
import axios from "axios";

import useParams from "../hooks/useParams";
import useSessionStorage from "../hooks/useStorage";

const AuthPage = ({ location }) => {
  const params = useParams(location);

  const [status, setStatus] = useState("initial");
  const [message, setMessage] = useState("");
  const [accessToken, setAccessToken] = useSessionStorage("gh:access:token");
  const authorizeDone = useRef(false);

  useEffect(() => {
    const authorize = async () => {
      try {
        setStatus("pending");
        setMessage("");
        // Authenticate and get access token
        const {
          data: { accessToken },
        } = await axios.post("api/auth", {
          code: params.code,
        });
        setAccessToken(accessToken);
        setStatus("fulfilled");
      } catch (error) {
        console.log(error);
        setStatus("failed");
        setAccessToken(null);
        setMessage(error.response?.data?.message || error.message);
      }
    };

    if (params.code && !authorizeDone.current) {
      authorize();
      authorizeDone.current = true;
    }
  }, [status, accessToken, setAccessToken, params.code]);

  useEffect(() => {
    if (accessToken) {
      navigate("/checkout");
    }
  }, [accessToken]);

  return (
    <main>
      <p>
        {status === "pending" && <>Calling GitHub...</>}
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

export default AuthPage;
