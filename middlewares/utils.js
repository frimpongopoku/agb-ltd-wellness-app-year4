const JWT = require("jsonwebtoken");
const { appResponse } = require("../controllers/misc/objects");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const createAccessToken = (userId, expiresIn = "1h") => {
  const payload = {};
  const options = {
    audience: userId,
    issuer: "wellness.agb-company-limited.org",
    expiresIn,
  };
  return new Promise((resolve, reject) => {
    JWT.sign(payload, ACCESS_TOKEN_SECRET, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const getAccessTokenFromHeader = (headers) => {
  const { authorization } = headers || {};
  const [_, token] = (authorization || "").split(" ");
  return token;
};



const verifyAccessToken = (token) => {
  try {
    const decoded = JWT.verify(token || "", ACCESS_TOKEN_SECRET);
    return { isValid: true, payload: decoded };
  } catch (error) {
    return { isValid: false, message: "User is not authenticated!" };
  }
};

module.exports = {
  createAccessToken,
  getAccessTokenFromHeader,
  verifyAccessToken,
};
