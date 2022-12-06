require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const publicRoutes = require("./routes/public");
const managerRoutes = require("./routes/manager");
const staffRoutes = require("./routes/staff");
const path = require("path");
const mustacheExpress = require("mustache-express");
const { connectToMongoDB } = require("./utils/utils");
const {
  authenticatedUserIsManager,
  authenticatedUserIsStaff,
  userIsAuthenticated,
} = require("./middlewares");
const { logout, whoAmI } = require("./controllers/UserController");

const IS_LOCAL = false;
const ORIGIN = IS_LOCAL
  ? "http://127.0.0.1:3000"
  : "https://agb-frontend-service.onrender.com"; // put prod react deployment link here
// --------------------------------------------------------
const DATABASE_CONNECTION_LINK = process.env.MONGODB_DATABSE_LINK;
const STATIC_PATH = express.static(path.join(__dirname, "./public"));

connectToMongoDB(DATABASE_CONNECTION_LINK); // Connect to the database

// ------ Registering View Engine ----------------
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/public/pages");

// ---------------------------------------------

app.use(express.json());
app.use(STATIC_PATH);
app.use(cookieParser());
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ---------------- DECLARING MIDDLEWARE -----------------

// app.use("/", setHeaders);

app.use("/manager", authenticatedUserIsManager);
app.use("/staff", authenticatedUserIsStaff);
// ---------------------------------------------------------
app.use("/whoami", userIsAuthenticated, whoAmI);
app.use("/logout", userIsAuthenticated, logout);

//---------------- ROUTE DECLARATION ----------------------

app.use("/staff", staffRoutes);
app.use("/manager", managerRoutes);
app.use("/", publicRoutes);

// ------ CREATE LISTENING PORT HERE TO ENTER THE APP --------

app.listen(4000, () => {
  console.log("listening to port 4000");
  console.log("...............................................");
});
