import createError from "http-errors";
import Joi from "joi";

import Stripe from "./../api-services/stripe";
import Github from "../api-services/github";

const stripe = Stripe();
const github = Github();

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`);

  try {
    if (req.method === "POST") {
      await createStripeSession(req, res);
    } else if (req.method === "GET") {
      await fetchStripeSession(req, res);
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

const createStripeSession = async (req, res) => {
  const schema = Joi.object({
    accessToken: Joi.string().required(),
    successUrl: Joi.string().required(),
    cancelUrl: Joi.string().required(),
  }).required();

  // 1. Validate that data coming in
  const { value, error } = schema.validate(req.body);
  if (error) {
    throw createError(422, error);
  }

  const user = await github.getUser({ accessToken: value.accessToken });
  const access = await github.getRepoAccess({
    username: user.username,
    owner: process.env.GITHUB_REPO_OWNER,
    repo: process.env.GITHUB_REPO,
  });

  if (access) {
    // 3. Respond
    res.status(202).json({
      message: `${user.username} already has access to the repo`,
    });
  } else {
    // 2. Create a Stripe Checkout Session for the amount

    const session = await stripe.createSession({
      username: user.username,
      priceId: process.env.STRIPE_PRICE_ID,
      successUrl: value.successUrl,
      cancelUrl: value.cancelUrl,
    });

    // 3. Redirect to the session url
    res.json({ url: session.url });
  }
};

const fetchStripeSession = async (req, res) => {
  const schema = Joi.object({
    sessionId: Joi.string().required(),
  }).required();

  // 1. Validate that data coming in
  const { value, error } = schema.validate(req.query);
  if (error) {
    throw createError(422, error);
  }

  // 2. Do the thing
  const sessionFromStripe = await stripe.getSession({ id: value.sessionId });
  const username = sessionFromStripe.metadata?.github;

  // Make sure we have the GitHub username needed
  if (!username) {
    throw createError(404, "GitHub username not found");
  }

  // Make sure the session is paid for
  if (sessionFromStripe.payment_status !== "paid") {
    throw createError(402, "Payment still required");
  }

  // 3. Respond
  res.status(200).json({
    message: `${username} shall get access to the repo shortly`,
  });
};
