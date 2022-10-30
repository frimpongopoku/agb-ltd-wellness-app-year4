const User = require("./../models/UserModel");
const { appResponse } = require("./misc/objects");
const hasher = require("bcrypt");
const { ROLES } = require("./misc/constants");

const create = async (req, res) => {
  const { firstName, lastName, dob, password } = req.body || {};

  try {
    if (!password)
      return res.send(appResponse({ error: "Please provide a password" }));
    const hashedPassword = await hasher.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      dob,
      password: hashedPassword,
      roles: [ROLES.STAFF],
    });
    res.status(201).send(appResponse({ data: user, status: 201 }));
  } catch (e) {
    res.send(appResponse({ error: e?.toString() }));
  }
};

module.exports = {
  create,
};
