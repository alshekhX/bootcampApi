//@des     get all bootcamps
//@route   GET :'api/v1/bootcamps'
//@access   'public'
const BootCamp = require("../model/Bootcamp");
const errorResponse = require("../util/ErrorResponse");
const asyncHandler = require('../middleware/async');
const geocoder = require('../util/GeoCoder');

exports.getBootCamps = asyncHandler(async (req, res, next) => {


  //we apply find() or create() or update() etc to the mongoose schema we create
  console.log(req.query);
  let query;
//copy of req.query
  let reqQuery={...req.query}
  //exxlude fields
  const removFields=['select','sort','limit','page'];

  //loop over removefields and delete them from reqQuery 
  removFields.forEach(param=> delete reqQuery[param]);


  //make req.query string
  let queryStr= JSON.stringify(reqQuery);

  //apply oprators to the string
  queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/,match=>`$${match}`);

//find values based on oprators
query=BootCamp.find(JSON.parse(queryStr));

//select specific fields
if(req.query.select){

  //extract selection value
const selectedFields=req.query.select.split(',').join(' ');
//use the in mongo select method ,the point is we make it easyer for us and the frontend developer to use this
query =query.select(selectedFields);


}

//sort by specific fields
if(req.query.sort){

  //extract selection value
const sortBy=req.query.sort.split(',').join(' ');
//use the in mongo select method ,the point is we make it easyer for us and the frontend developer to use this
query=query.sort(sortBy);


}else{
  query=query.sort('-createdAt');


}

//what page ,pagenation
const page = parseInt(req.query.page,10) ||1;
//number of resource per page
const limit= parseInt(req.query.limit,10) ||10;
//how many record skip also index of the first resource in the page
const startIndex=(page-1)*limit;
//obvious
const endIndex=page*limit;

//total number of the schema document in the  database 
const total=await BootCamp.countDocuments();

//nice piece of code, 
query=query.skip(startIndex).limit(limit);



const bootcamps=await query;

// adding next and prev page 
//pagination object
const pagination={}


if(endIndex<total){

pagination.next={
  page:page+1,
  limit:limit
}
}
if(startIndex>0){

  pagination.prev={
    page:page-1,
    limit:limit
  }}

  

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });

});

//@des     get one bootcamps
//@route   GET :'api/v1/bootcamps/:id'
//@access   'public'

exports.getBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);

  if (!bootcamp) {
    next(new errorResponse(`bootcamp not found of id ${req.params.id}`, 400));
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });

});

//@des     post bootcamps
//@route   POST :'api/v1/bootcamps'
//@access   'private'
exports.createBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });

});

//@des     update bootcamps
//@route   PUT :'api/v1/bootcamps'
//@access   'public'
exports.updateBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(new errorResponse('bootcamp not found', 404));
  }
  res.status(200).json({
    success: true,
    status: `update  booty number ${req.params.id}`,

    data: bootcamp,
  });


});

//@des     delete bootcamps
//@route   DELETE :'api/v1/bootcamps'
//@access   'private'

exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(new errorResponse(`bootcamp with id ${req.params.id} not found`, 404));
  }

  res.status(200).json({
    success: true,
    data: {},
  });

});



//@des     get bootcamps within a specific radius
//@route   GET :'api/v1/bootcamps/radius/:zipcode/:distance'
//@access   'private'

exports.getBootCampInRadius = asyncHandler(async (req, res, next) => {

  const { zipcode, distance } = req.params;


  //get lat and long
  //get the zip code lat and lon
  const loc = await geocoder.geocode(zipcode);
  const long = loc[0].longitude;
  const lat = loc[0].latitude;
  


  //divide the distence by the earth radius (نصف القطر) so you can get the search raduis
  //earth radius in killometers is 6,378

  const radius =  distance/6378;

  console.log(distance);


  const bootcamps =await  BootCamp.find({
    location: {
      $geoWithin: { $centerSphere: [[long, lat], radius] }

    }
  });

  res.status(200).json({
    success:true,
    count: bootcamps.length,
    data:bootcamps
  });


});
