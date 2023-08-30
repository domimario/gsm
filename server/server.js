require("./config/moongoseConfig");

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const { modelNames } = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routeFiles = [
  "./routes/modelRoutes",
  "./routes/sellerRoutes",
  "./routes/brandRoutes",
  "./routes/mobileRoutes",
];

routeFiles.forEach((routeFile) => {
  require(routeFile)(app);
});

// app.listen(8000, () => {
//   console.log("Listening at Port 8000");
// });

module.exports.handler = serverless(app);



