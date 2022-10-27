const express = require("express");
const app = express();

const publicRoutes = require("./routes/public");
const staffRoutes = require("./routes/staff");
const managerRoutes = require("./routes/manager");
// ------------------ CREATE LISTENING PORT HERE TO ENTER THE APP --------

app.use("/", publicRoutes);
app.use("/staff", staffRoutes);
app.use("/manager", managerRoutes);

app.listen(4000, () => {
  console.log("listening to port 4000");
  console.log("...............................................");
});
