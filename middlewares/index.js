const { ROLES } = require("../controllers/misc/constants");
const { appResponse } = require("../controllers/misc/objects");
const User = require("../models/UserModel");
const { verifyAccessToken, getAccessTokenFromHeader } = require("./utils");

const verifyAuthentication = (req) => {
  // Get access token from cookies, or header
  const accessToken =
    req.cookies?._token || getAccessTokenFromHeader(req.headers);
  const token = verifyAccessToken(accessToken);
  return token;
};

const userIsAuthenticated = async (req, res, next) => {
  const token = verifyAuthentication(req);
  if (!token.isValid)
    return appResponse({
      res,
      error: token.message,
      status: 401, // Unauthorized
    });
    
  req.body.context = token.payload
  next();
};

const authenticatedUserIsStaff = async (req, res, next) => {
  const { htmlResponse } = req.body;
  const token = verifyAuthentication(req);
  if (!token.isValid)
    return appResponse({
      htmlResponse,
      res,
      error: token.message,
      status: 401, // Unauthorized
    });
  const userId = (token.payload || {}).aud;

  try {
    const user = await User.findOne({ _id: userId });
    const isStaff = (user.roles || []).find(
      (role) => role.key === ROLES.STAFF.key
    );
    if (!isStaff)
      return appResponse({
        htmlResponse,
        res,
        status: 403, // Forbidden
        error:
          "The authenticated user needs have staff priviledges use this route",
      });
    req.body.userId = userId;
    req.body.context = token.payload
    next();
  } catch (e) {
    appResponse({ res, htmlResponse, error: e?.toString() });
  }
};
const authenticatedUserIsManager = async (req, res, next) => {
  const { htmlResponse } = req.body;
  const token = verifyAuthentication(req);
  if (!token.isValid)
    return appResponse({
      htmlResponse,
      res,
      status: 401, // Unauthorized
      error: token.message,
    });
  const userId = (token.payload || {}).aud;

  try {
    const user = await User.findOne({ _id: userId });
    const isManager = (user.roles || []).find(
      (role) => role.key === ROLES.MANAGER.key
    );
    if (!isManager)
      return appResponse({
        htmlResponse,
        res,
        status: 403, // Forbidden
        error:
          "The authenticated user needs to have manager priviledges to perform this action",
      });
    req.body.userId = userId;
    req.body.context = token.payload
    next();
  } catch (e) {
    appResponse({ res, htmlResponse, error: e?.toString() });
  }
};

const setHeaders = (req, res, next) => {
  const isAView = req.url.includes("/view/");
  if (isAView) {
    res.setHeader("Content-Type", "text/html");
    req.body.htmlResponse = true;
    return next();
  }
  res.setHeader("Content-Type", "application/json");
  next();
};

module.exports = {
  userIsAuthenticated,
  authenticatedUserIsManager,
  authenticatedUserIsStaff,
  setHeaders,
};
