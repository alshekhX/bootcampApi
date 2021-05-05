const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const colors = require("colors");

//import custome error handler
const errorHandler = require("./middleware/error");
const dbConnect = require("./config/db");

//import logger url
// const logger = require("./middleware/logger");
dotenv.config({ path: "./config/config.env" });

//import bootcamps routes
const bootcamp = require("./routes/bootcamp");
//load env var

//mongoose database connection
dbConnect();
const app = express();
app.use(express.json());

//use morgan logger middleware

if (process.env.NODE_ENV === "development") {
  //middleware
  app.use(morgan("dev"));
}

//route
app.use("/api/v1/bootcamps", bootcamp);

//using error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("connected on port 5000".green.bold);
});
//handeling unhandle promises
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  //close the application
  server.close(() => {
    process.exit(1);
  });
});
