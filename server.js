const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

const dbConnect = require("./config/db");

//import logger url
// const logger = require("./middleware/logger");

//import bootcamps routes
const bootcamp = require("./routes/bootcamp");
//load env var
dotenv.config({ path: "./config/config.env" });

dbConnect();
const app = express();

//use morgan logger middleware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamp);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("connected on port 5000".yellow.bold);
});
//handeling unhandle promises
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  //close the application
  server.close(() => {
    process.exit(1);
  });
});
