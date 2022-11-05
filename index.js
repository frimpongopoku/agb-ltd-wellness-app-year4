require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const publicRoutes = require("./routes/public");
const managerRoutes = require("./routes/manager");
const staffRoutes = require("./routes/staff");
const path = require("path");
const { connectToMongoDB } = require("./utils/utils");
const {
  authenticatedUserIsManager,
  authenticatedUserIsStaff,
  setHeaders,
  userIsAuthenticated,
} = require("./middlewares");
const { logout, whoAmI } = require("./controllers/UserController");
// --------------------------------------------------------
const DATABASE_CONNECTION_LINK = process.env.MONGODB_DATABSE_LINK;
const STATIC_PATH = express.static(path.join(__dirname, "./public"));

connectToMongoDB(DATABASE_CONNECTION_LINK);

app.use(express.json());
app.use(STATIC_PATH);
app.use(cookieParser());

// ---------------- DECLARING MIDDLEWARE -----------------

app.use("/", setHeaders);
app.use("/manager", authenticatedUserIsManager);
app.use("/staff", authenticatedUserIsStaff);

//---------------- ROUTE DECLARATION ----------------------

app.use("/staff", staffRoutes);
app.use("/manager", managerRoutes);
app.use("/", publicRoutes);

// ---------------------------------------------------------
app.use("/whoami", userIsAuthenticated, whoAmI);
app.use("/logout", userIsAuthenticated, logout);

// ------ CREATE LISTENING PORT HERE TO ENTER THE APP --------

app.listen(4000, () => {
  console.log("listening to port 4000");
  console.log("...............................................");
});
