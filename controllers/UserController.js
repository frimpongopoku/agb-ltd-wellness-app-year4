const User = require("./../models/UserModel");
const { appResponse } = require("./misc/objects");
const hasher = require("bcrypt");
const { ROLES, MANAGER_CODES, STAFF_CODES } = require("./misc/constants");
const { emailIsValid } = require("../utils/utils");
const { createAccessToken } = require("../middlewares/utils");

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
    res.status(201).send(appResponse({ data: user, status: 201 }));
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
        error: "Please provide a valid email and password",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send(
        appResponse({
          status: 404,
          error: `Sorry, could not find user with email '${email}'`,
        })
      );

    const passwordIsRight = await hasher.compare(password, user.password);
    if (!passwordIsRight)
      return res.send(appResponse({ error: "Password is incorrect!" }));

    // Create an access token for 7days
    const token = await createAccessToken(user._id?.toString(), "7d");
    res.cookie("_token", token);
    return res.send(appResponse({ data: user }));
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
  const user = User.findOne({ email });

  if (!user)
    return res.send(
      appResponse({
        error:
          "Sorry, could not find your account. Please make sure a staff has already added you!",
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
      roles: [ROLES.STAFF],
      verified: true,
    };

    User.findOneAndUpdate({ email }, toUpdate, { new: true }).then(
      (result, error) => {
        if (error) return res.send(appResponse({ error }));

        res.send(appResponse({ data: result, status: 200 }));
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
  const { email } = req.body || {};

  if (!email || !emailIsValid(email))
    return res.send(appResponse({ error: "Please enter a valid email" }));

  const user = await User.create({ email });

  if (!user)
    return appResponse({ res, error: "Sorry, we could not add staff member" });
  return appResponse({ res, data: user });
};

const logout = (req, res) => {
  res.clearCookie("_token");
  appResponse({ res, data: "Signed out successfully!" });
};
module.exports = {
  registerManager: create,
  login,
  validateStaff,
  addStaff,
  logout
};
