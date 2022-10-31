const User = require("./../models/UserModel");
const { appResponse } = require("./misc/objects");
const hasher = require("bcrypt");
const { ROLES, MANAGER_CODES } = require("./misc/constants");

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
      roles: [ROLES.STAFF],
    });
    res.status(201).send(appResponse({ data: user, status: 201 }));
  } catch (e) {
    res.send(appResponse({ error: e?.toString() }));
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
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
    return es.send(appResponse({ data: user }));
  } catch (e) {
    res.send(appResponse({ error: e?.toString() }));
  }
};

module.exports = {
  create,
  login,
};
