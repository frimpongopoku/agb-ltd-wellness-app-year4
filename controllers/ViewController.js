const path = require("path");

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
  res.sendFile(`${PATH}/pages/errors/404.html`);
};

const showCategoriesView = (_, res) => {
  res.sendFile(`${PATH}/pages/category.html`);
};
const showGoalsView = (_, res) => {
  res.sendFile(`${PATH}/pages/goal.html`);
};

module.exports = {
  showLandingPage,
  showLoginPage,
  show404,
  showCategoriesView,
  showGoalsView,
};
