require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const catRoutes = require("./routes/category");
const goalRoutes = require("./routes/goal");

const { connectToMongoDB } = require("./utils/utils");
const { userIsAuthenticated } = require("./middlewares");
const DATABSE_CONNECTION_LINK = process.env.MONGODB_DATABSE_LINK;

connectToMongoDB(DATABSE_CONNECTION_LINK);

app.use(express.json());

// ---------------- DECLARING MIDDLEWARE -----------------
app.use("/user",userIsAuthenticated)
//--------------------------------------------------------


app.use("/user", userRoutes);
app.use("/category", catRoutes);
app.use("/goal", goalRoutes);


// ------------------ CREATE LISTENING PORT HERE TO ENTER THE APP --------

app.listen(4000, () => {
  console.log("listening to port 4000");
  console.log("...............................................");
});
