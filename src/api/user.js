import createError from "http-errors";
import axios from "axios";

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`);

  try {
    if (req.method === "GET") {
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
  // 1. Validate
  const { accessToken } = req.query;

  if (!accessToken) {
    throw createError(422, "Missing access token");
  }

  // 2. Do the thing
  const {
    data: { login, avatar_url },
  } = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const github = {
    username: login,
    avatarUrl: avatar_url,
    [process.env.GATSBY_GITHUB_REPO]: false,
  };

  const result = await axios.get(
    `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GATSBY_GITHUB_REPO}/collaborators/${github.username}`,
    {
      validateStatus: (status) => {
        // 204 means the user is a collaborator
        // 404 means the user is not a collaborator
        return [204, 404].includes(status);
      },
      headers: {
        Authorization: `token ${process.env.GITHUB_REPO_ACCESS_TOKEN}`,
      },
    }
  );

  if (result.status === 204) {
    github[process.env.GATSBY_GITHUB_REPO] = true;
  }

  // 3. Respond
  res.json(github);
};
