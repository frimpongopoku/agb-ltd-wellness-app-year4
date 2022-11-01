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
const userIsStaff = (req, res, next) => {};
const userIsManager = (req, res, next) => {};

module.exports = {
  userIsAuthenticated,
  userIsStaff,
  userIsManager,
};
