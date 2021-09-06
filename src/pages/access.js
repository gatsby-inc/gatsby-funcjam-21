import React, { useEffect, useState } from "react";
import axios from "axios";
import useParams from "../hooks/useParams";

const SuccessPage = ({ location }) => {
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const params = useParams(location);

  useEffect(() => {
    if (!params.code) return;

    const authorize = async () => {
      console.log(params);
      try {
        const { data } = await axios.post("api/auth", params);
        console.log(data);
      } catch (error) {
        setStatus("failed");
        setMessage(error.response?.data?.message || error.message);
      }
    };

    authorize();

    // Grab the session
  }, [params]);

  return (
    <main>
      <p>
        {status === "pending" && <>Authorizing...</>}
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

export default SuccessPage;
