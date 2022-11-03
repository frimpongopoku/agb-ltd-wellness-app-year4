require("dotenv").config();
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
} = require("./middlewares");
const {
  createAccessToken,
  getAccessTokenFromHeader,
  verifyAccessToken,
} = require("./middlewares/utils");
const DATABSE_CONNECTION_LINK = process.env.MONGODB_DATABSE_LINK;
const STATIC_PATH = express.static(path.join(__dirname, "./public"));

connectToMongoDB(DATABSE_CONNECTION_LINK);

app.use(express.json());
app.use(STATIC_PATH);

// ---------------- DECLARING MIDDLEWARE -----------------
app.use("/manager", authenticatedUserIsManager);
app.use("/staff", authenticatedUserIsStaff);

//---------------- ROUTE DECLARATION ----------------------
app.use("/", publicRoutes);
app.use("/staff", staffRoutes);
app.use("/manager", managerRoutes);

app.use("/try-token", async (req, res) => {
  const token = await createAccessToken(req.body.user_id, "15s");
  res.send({ token });
});

app.use("/check-bearer", async (req, res) => {
  const token = getAccessTokenFromHeader(req.headers);
  const response = verifyAccessToken(token);
  res.send({ response });
});

// ------------------ CREATE LISTENING PORT HERE TO ENTER THE APP --------

app.listen(4000, () => {
  console.log("listening to port 4000");
  console.log("...............................................");
});
