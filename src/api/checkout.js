const createError = require("http-errors");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().required(),
  amount: Joi.number().min(1000).required(),
  successUrl: Joi.string().required(),
  cancelUrl: Joi.string().required(),
}).required();

const postHandler = async (req, res) => {
  // 1. Validate that data coming in
  const { value, error } = schema.validate(req.body);
  if (error) {
    throw createError(422, error);
  }

  const { amount, username, successUrl, cancelUrl } = value;

  // 2. Create a Stripe Checkout Session for the amount
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: 1,
        price_data: {
          unit_amount: amount * 100,
          currency: "usd",
          product: process.env.STRIPE_PRODUCT_ID,
        },
      },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    metadata: {
      gitHubUsername: username,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  // 3. Send back the URL for the Checkout Session
  res.status(200).json({
    message: `Created a Stripe Checkout Session: ${session.id}`,
    url: session.url,
  });
};

const getHandler = async (req, res) => {
  // 1. Validate
  if (!req.query.session_id) {
    throw createError(422, "Missing Stripe Session Id", { expose: false });
  }

  // 2. Do the thing
  const sessionFromStripe = await stripe.checkout.sessions.retrieve(
    req.query.session_id
  );
  const { gitHubUsername } = sessionFromStripe.metadata || {};

  // Make sure we have the GitHub username needed
  if (!gitHubUsername) {
    throw createError(404, "GitHub username not found");
  }

  // Make sure the session is paid for
  if (sessionFromStripe.payment_status !== "paid") {
    throw createError(402, "Payment still required");
  }

  // 3. Respond
  res.status(200).json({
    message: `${gitHubUsername} has gotten access to the repo`,
  });
};

export default async function handler(req, res) {
  console.log(`Checkout: ${req.method}`);

  try {
    if (req.method === "POST") {
      await postHandler(req, res);
    } else if (req.method === "GET") {
      await getHandler(req, res);
    } else {
      throw createError(405, `${req.method} not allowed`);
    }
  } catch (error) {
    // Something went wrong, log it
    console.error(error.message);

    // Respond with error code and message
    res.status(error.statusCode || 500).json({
      message: error.expose ? error.message : "Faulty Checkout",
    });
  }
}
