const { ROLES } = require("../controllers/misc/constants");
const { appResponse } = require("../controllers/misc/objects");
const User = require("../models/UserModel");

const userIsAuthenticated = async (req, res, next) => {
  const { user_id } = req.body || {};
  if (!user_id)
    return appResponse({
      res,
      error: "Please provide a valid 'user_id' of the signed in user",
    });

  try {
    const user = await User.findOne({ _id: user_id });
    if (!user)
      return appResponse({
        res,
        error: "Unable to authenticate, please sign in",
      });

    next();
  } catch (e) {
    appResponse({ res, error: e?.toString() });
  }
};
const authenticatedUserIsStaff = async (req, res, next) => {
  const { user_id } = req.body || {};
  if (!user_id)
    return appResponse({
      res,
      error: "Please provide a valid 'user_id' of the signed in user",
    });

  try {
    const user = await User.findOne({ _id: user_id });
    if (!user)
      return appResponse({
        res,
        error: "Unable to authenticate, please sign in",
      });

    const isStaff = (user.roles || []).find(
      (role) => role.key === ROLES.STAFF.key
    );
    if (!isStaff)
      return appResponse({
        res,
        error:
          "The authenticated user needs have staff priviledges use this route",
      });
    next();
  } catch (e) {
    appResponse({ res, error: e?.toString() });
  }
};
const authenticatedUserIsManager = async (req, res, next) => {
  const { user_id } = req.body || {};
  if (!user_id)
    return appResponse({
      res,
      error: "Please provide a valid 'user_id' of the signed in user",
    });

  try {
    const user = await User.findOne({ _id: user_id });
    if (!user)
      return appResponse({
        res,
        error: "Unable to authenticate, please sign in",
      });

    const isManager = (user.roles || []).find(
      (role) => role.key === ROLES.MANAGER.key
    );
    if (!isManager)
      return appResponse({
        res,
        error:
          "The authenticated user needs have manager priviledges use this route",
      });
    next();
  } catch (e) {
    appResponse({ res, error: e?.toString() });
  }
};

module.exports = {
  userIsAuthenticated,
  authenticatedUserIsManager,
  authenticatedUserIsStaff,
};
