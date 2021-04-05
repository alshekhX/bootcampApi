//@des     log shit up

const logger = (req, res, next) => {
  req.hello = "hello world";
  console.log("this is middleware");
  next();
};
module.exports = logger;
