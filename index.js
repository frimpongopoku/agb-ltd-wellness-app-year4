require("dotenv").config();
const express = require("express");
const app = express();
const publicRoutes = require("./routes/public");
const userRoutes = require("./routes/user");
const managerRoutes = require("./routes/manager");
const staffRoutes = require("./routes/staff");

const { connectToMongoDB } = require("./utils/utils");
const { userIsAuthenticated, authenticatedUserIsManager, authenticatedUserIsStaff } = require("./middlewares");
const DATABSE_CONNECTION_LINK = process.env.MONGODB_DATABSE_LINK;

connectToMongoDB(DATABSE_CONNECTION_LINK);

app.use(express.json());

// ---------------- DECLARING MIDDLEWARE -----------------
// app.use("/user", userIsAuthenticated);
app.use("/manager", authenticatedUserIsManager);
app.use("/staff", authenticatedUserIsStaff);


//---------------- ROUTE DECLARATION ----------------------
app.use("/", publicRoutes);
app.use("/staff", staffRoutes);
app.use("/manager", managerRoutes);


// ------------------ CREATE LISTENING PORT HERE TO ENTER THE APP --------

app.listen(4000, () => {
  console.log("listening to port 4000");
  console.log("...............................................");
});
