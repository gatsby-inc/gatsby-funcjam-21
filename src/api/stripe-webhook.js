const createError = require("http-errors");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const webhookHandler = async (req, res) => {
  // 1. Validate
  const { type, data } = req.body;

  if (type !== "checkout.session.completed") {
    throw createError(422, `${req.body.type} not allowed`, { expose: false });
  }

  const sessionFromStripe = await stripe.checkout.sessions.retrieve(
    data.object.id
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

  // 2. Do the thing
  console.log("Add to GitHub repo");

  // 3. Respond
  res.send("OK");
};

export default async function handler(req, res) {
  console.log(`Stripe Webhook (${req.body.type})`);

  try {
    // Only handle POST requests for webhooks
    if (req.method === "POST") {
      await webhookHandler(req, res);
    } else {
      throw createError(405, `${req.method} not allowed`);
    }
  } catch (error) {
    // Something went wrong, log it
    console.error(`Stripe Webhook (${req.body.type})`, error.message);

    // Respond with error code and message
    res.status(error.statusCode || 500).json({
      message: error.expose ? error.message : "Faulty Checkout",
    });
  }
}
