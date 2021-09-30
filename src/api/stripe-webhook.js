import createError from "http-errors";

import Stripe from "./../api-services/stripe";
import Github from "./../api-services/github";

const stripe = Stripe(process.env.STRIPE_KEY);
const github = Github();

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`);

  try {
    // Only handle POST requests for webhooks
    if (req.method === "POST") {
      await postHandler(req, res);
    } else {
      throw createError(405, `${req.method} not allowed`);
    }
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500;
    const message = error.response?.data?.message || error.message;

    // Something went wrong, log it
    console.error(`${status} -`, message);

    // Respond with error code and message
    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}`,
    });
  }
}

const postHandler = async (req, res) => {
  // 1. Validate
  const { type, data } = req.body;

  console.log(type);

  if (type !== "checkout.session.completed") {
    throw createError(422, `${req.body.type} not supported`);
  }

  const sessionFromStripe = stripe.getSession({ id: data.object.id });

  const username = sessionFromStripe.metadata?.github;

  // // Make sure we have the GitHub username needed
  if (!username) {
    throw createError(404, "GitHub username not found");
  }

  // Make sure the session is paid for
  if (sessionFromStripe.payment_status !== "paid") {
    throw createError(402, "Payment still required");
  }

  // 2. Do the thing
  await github.addRepoAccess({ username: username });

  // 3. Respond
  res.send("OK");
};
