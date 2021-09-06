import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "gatsby";
import queryString from "query-string";

const DEFAULT_VALUES = {};
if (process.env.GATSBY_PREFILL) {
  DEFAULT_VALUES.username = "raae";
  DEFAULT_VALUES.amount = 1000;
}

export default function App({ location }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = queryString.parse(location.search);
    if (params.payment === "cancelled") {
      setMessage("You cancelled...try again?");
    }
  }, [location.search]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, ...stuff },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = async (data) => {
    const result = await axios.post("/api/checkout", {
      ...data,
      cancelUrl: `${location.origin}/?payment=cancelled`,
      successUrl: `${location.origin}/success/?session_id={CHECKOUT_SESSION_ID}`,
    });

    window.location = result.data.url;
  };

  console.log({ errors, stuff });

  return (
    <main>
      <header>
        <h1>Buy access to my repo</h1>
      </header>
      <p>Pay what you want above $1000 for my private GitHub Repo!!!!</p>
      <p>
        <a href="/api/auth">Login with GitHub</a>
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: `block`, width: 400 }}
      >
        <fieldset disabled={isSubmitting}>
          <label htmlFor="username">Github username:</label>
          <br />
          <input
            type="text"
            {...register("username", { required: true, maxLength: 80 })}
          />
          <br />
          <br />

          <label htmlFor="first-name">
            Price in USD you are willing to pay:
          </label>
          <br />
          <input
            type="number"
            {...register("amount", { required: true, min: 1000 })}
          />
          <br />
          <br />

          <button>Buy access</button>
        </fieldset>
      </form>
      <p>
        {message ? (
          <>
            <br />
            <small>{message}</small>
          </>
        ) : null}
      </p>
    </main>
  );
}
