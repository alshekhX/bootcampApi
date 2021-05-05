
const errorResponse = require("../util/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);
  console.log(err.name.red);
//copy the properties of err object,just the properties
  let error={...err};

  error.message=err.message;

  console.log('this is it');

console.log(err.name);

  //handle mongodb cast error bad objectid

  if(err.name==='CastError'){
    const message=`resource not found with the id ${err.value}`
error =  new errorResponse(message,404);

  }

//mongoose duplicate key value
if(err.code===11000)
{
const message='duplicate value entered';
error=new errorResponse(message,400);

}

//mongoose validation error

if(err.name==='ValidationError'){

  //smart piece of code
const message=Object.values(err.errors).map(value => value.message);

error=new errorResponse(message,400);


}

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "error message",
  });
};

module.exports = errorHandler;
