const path = require("path");
const Category = require("../models/CategoryModel");
const Goal = require("../models/GoalModel");
const User = require("../models/UserModel");
const { appResponse } = require("./misc/objects");

const PATH = path.join(__dirname, `../public`);

const showLandingPage = (_, res) => {
  res.send(findFile("index.html"));
};

const showLoginPage = (_, res) => {
  res.sendFile(`${PATH}/pages/auth/login.html`);
};
const show404 = (_, res) => {
  res.status(404);
  res.setHeader("Content-Type", "text/html");
  res.render("errors/404");
  // res.sendFile(`${PATH}/pages/errors/404.html`);
};

const showCategoriesView = async (req, res) => {
  const { context } = req.body;
  const userId = context.aud;
  try {
    const user = await User.findOne({ _id: userId }).select(["-password"]);
    const categories = await Category.find({ owner: userId });
    const staffCreated = await User.find({ creator: userId });
    res.render("category", { user, categories, staff: staffCreated });
  } catch (e) {
    res.render("errors/400", { error: e.toString() });
  }
};
const showGoalsView = async (req, res) => {
  const { context } = req.body;
  const userId = context.aud;
  try {
    const user = await User.findOne({ _id: userId }).select(["-password"]);
    const goals = await Goal.find({ owner: userId });
    res.render("goal", { user, goals });
  } catch (e) {
    res.render("errors/400", { error: e.toString() });
  }

  // res.sendFile(`${PATH}/pages/goal.html`);
};

module.exports = {
  showLandingPage,
  showLoginPage,
  show404,
  showCategoriesView,
  showGoalsView,
};
