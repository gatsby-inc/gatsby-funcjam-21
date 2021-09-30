import Stripe from "stripe";

export default (stripeKey = process.env.STRIPE_KEY) => {
  const stripe = Stripe(stripeKey);

  const log = (...args) => {
    console.log("Stripe:", ...args);
  };

  const createSession = async ({
    username,
    successUrl,
    cancelUrl,
    priceId,
  }) => {
    const session = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        github: username,
      },
    });

    log("createSession", session.id);

    return session;
  };

  const getSession = async ({ id }) => {
    const session = await stripe.checkout.sessions.retrieve(id);

    log("retrieveSession", session.id);

    return session;
  };

  return {
    createSession,
    getSession,
  };
};
