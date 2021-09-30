import createError from "http-errors";
import axios from "axios";

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`);

  try {
    if (req.method === "POST") {
      await postHandler(req, res);
    } else if (req.method === "GET") {
      await getHandler(req, res);
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
      message: error.expose ? message : "Faulty User Endpoint",
    });
  }
}

const getHandler = async (req, res) => {
  const GITHUB_AUTH_URL_BASE = `https://github.com/login/oauth/authorize`;
  const GITHUB_PARAMS = `scope=user:email&client_id=${process.env.GITHUB_CLIENT_ID}`;
  const GITHUB_AUTH_URL = `${GITHUB_AUTH_URL_BASE}?${GITHUB_PARAMS}`;
  res.redirect(GITHUB_AUTH_URL);
};

const postHandler = async (req, res) => {
  // 1. Validate
  const { code } = req.body;

  if (!code) {
    throw createError(422, "Missing auth code or state", { expose: false });
  }

  // 2. Do the thing
  const {
    data: { error, error_description, access_token },
  } = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      code: req.body.code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (error) {
    throw createError(401, error_description);
  }

  // 3. Respond
  res.json({
    accessToken: access_token,
  });
};
