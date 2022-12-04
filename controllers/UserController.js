const User = require("./../models/UserModel");
const { appResponse, getUserRoles } = require("./misc/objects");
const hasher = require("bcrypt");
const { ROLES, MANAGER_CODES, STAFF_CODES } = require("./misc/constants");
const { emailIsValid } = require("../utils/utils");
const { createAccessToken } = require("../middlewares/utils");
const Goal = require("../models/GoalModel");
const Category = require("../models/CategoryModel");
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
/**
 * Mainly for Managers who already have a code to register on the platform
 * @param {*} req
 * @param {*} res
 * @returns
 */
const create = async (req, res) => {
  const { firstName, lastName, dob, password, email, code } = req.body || {};
  const codeIsValid = MANAGER_CODES.includes(code);

  try {
    if (!code || !codeIsValid)
      return res.send(
        appResponse({ error: "Please provide a valid manager code." })
      );
    if (!password)
      return res.send(appResponse({ error: "Please provide a password" }));
    const hashedPassword = await hasher.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      dob,
      email,
      password: hashedPassword,
      roles: [ROLES.STAFF, ROLES.MANAGER],
      verified: true,
    });
    let withoutPassword = user.toObject();
    delete withoutPassword.password;
    // Create an access token for 7days
    const token = await createAccessToken(user._id?.toString(), "7d");
    // And set it in cookies for 7 days as well
    res.cookie("_token", token, { maxAge: ONE_WEEK });
    res.status(201).send(appResponse({ data: withoutPassword, status: 201 }));
  } catch (e) {
    res.send(appResponse({ error: e?.toString() }));
  }
};

/**
 * Route to allow any user that already exists on the platform to sign in
 * @param {*} req
 * @param {*} res
 * @returns
 */
const login = async (req, res) => {
  const { email, password } = req.body || {};
  try {
    if (!email || !password)
      return appResponse({
        res,
        error: "Please provide a valid email and password",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send(
        appResponse({
          res,
          status: 404,
          error: `Sorry, could not find user with email '${email}'`,
        })
      );

    const passwordIsRight = await hasher.compare(password, user.password);
    if (!passwordIsRight)
      return res.send(appResponse({ error: "Password is incorrect!" }));

    // Create an access token for 7days
    const token = await createAccessToken(user._id?.toString(), "7d");
    // And set it in cookies for 7 days as well
    res.cookie("_token", token, { maxAge: ONE_WEEK });
    let withoutPassword = user.toObject();
    delete withoutPassword.password; // dont send the user object with password to the fronted. Remove it first

    return res.send(appResponse({ data: withoutPassword }));
  } catch (e) {
    res.send(appResponse({ error: e?.toString() }));
  }
};

/**
 * Route used to validate a user who has been added by a manager already
 * Here they are able to now add a password that will allow them to sign in later
 * @param {*} req
 * @param {*} res
 */
const validateStaff = async (req, res) => {
  const { firstName, lastName, dob, password, email, code } = req.body || {};
  const codeIsValid = STAFF_CODES.includes(code);

  var user = await User.findOne({ email: email.toLowerCase() });

  if (!user)
    return res.send(
      appResponse({
        error:
          " Please make sure a manager has already added you, to register!",
      })
    );

  try {
    if (!code || !codeIsValid)
      return res.send(
        appResponse({ error: "Please provide a valid staff code." })
      );
    if (!password)
      return res.send(appResponse({ error: "Please provide a password" }));

    const hashedPassword = await hasher.hash(password, 10);

    const toUpdate = {
      firstName,
      lastName,
      dob,
      password: hashedPassword,
      verified: true,
    };

    User.findOneAndUpdate({ email }, toUpdate, { new: true }).then(
      async (result, error) => {
        if (error) return res.send(appResponse({ error }));
        const obj = result.toObject();
        delete obj.password;
        const token = await createAccessToken(user._id?.toString(), "7d");
        res.cookie("_token", token, { maxAge: ONE_WEEK });
        res.send(appResponse({ data: obj, status: 200 }));
      }
    );
  } catch (e) {
    res.send(appResponse({ error: e?.toString() }));
  }
};

/**
 * Allows managers to add a staff member into the system
 * @param {*} req
 * @param {*} res
 */
const addStaff = async (req, res) => {
  const { email, context } = req.body || {};
  const userId = context.aud;

  if (!email || !emailIsValid(email))
    return res.send(appResponse({ error: "Please enter a valid email" }));

  const user = await User.create({
    email: email.toLowerCase(),
    creator: userId,
    roles: [ROLES.STAFF],
  });

  if (!user)
    return appResponse({ res, error: "Sorry, we could not add staff member" });
  return appResponse({ res, data: user });
};

/**
 * Clears out all cookies to sign user out
 * @param {*} _
 * @param {*} res
 */
const logout = (_, res) => {
  res.clearCookie("_token");
  appResponse({ res, data: "Signed out successfully!" });
};

/**
 * Uses the access token saved in cookies to
 * retrieve the current user that is signed in
 * @param {*} _
 * @param {*} res
 */
const whoAmI = async (req, res) => {
  const { context } = req.body;
  const userId = context?.aud;

  try {
    const user = await User.findOne({ _id: userId }).select(["-password"]); // dont add password field when retrieving object, even though its hashed
    const { isManager, isStaff } = getUserRoles(user);
    let goals = [],
      categories = [],
      staffs = [];
    if (isStaff) goals = await Goal.find({ owner: userId }); // Retrieve all goals that were created by the stafff
    if (isManager) {
      categories = await Category.find(); // simply retreive all categories
      staffs = await User.find({
        roles: { $elemMatch: { key: ROLES.STAFF.key } },
      }).select(["-password"]);
    }

    appResponse({
      res,
      data: {
        user: {
          isManager: isManager ? true : false,
          isStaff: isStaff ? true : false,
          ...user.toObject(),
        },
        goals,
        categories,
        staffs,
      },
    });
  } catch (e) {
    appResponse({ res, error: e?.toString() });
  }
};

/**
 * Retrieves all the staff members that a particular manager has added
 * to the platform
 * @param {*} req
 * @param {*} res
 */
const listMyStaff = async (req, res) => {
  const { context } = req.body;
  const userId = context.aud;
  try {
    const staffMembers = await User.find({ creator: userId }).select([
      "-password",
    ]);
    appResponse({ res, data: staffMembers });
  } catch (e) {
    appResponse({ res, error: e.toString() });
  }
};
module.exports = {
  registerManager: create,
  login,
  validateStaff,
  addStaff,
  logout,
  whoAmI,
  listMyStaff,
};
