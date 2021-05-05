const mongoose = require("mongoose");


//slugfy allow you to change character properties
const slugify=require('slugify');
const geocoder = require("../util/GeoCoder");


//import node geocode to get location details 
const geoCoder=require('../util/GeoCoder');




const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 char"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add some discription"],
    maxlength: [500, "Desceiption must be less than 500 characters"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      //the string value can only be point
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRaiting: {
    type: Number,
    min: [1, "minimum raiting value"],
    max: [10, "maximum raiting  value"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no_photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



//slugify name
BootcampSchema.pre('save',function(next) {
  this.slug=slugify(this.name,{lower:true})
  next();
});


//geocode and create location info

BootcampSchema.pre('save',async function(next) {

  const loc =await  geocoder.geocode(this.address);
  this.location={

type:'point'
,
coordinates:[loc[0].longitude,loc[0].latitude],
formattedAddress:loc[0].formattedAddress,
street: loc[0].streetName,
city:  loc[0].city,
state:  loc[0].stateCode,
zipcode:  loc[0].zipcode,
country: loc[0].country,


  }

 
  next();
});


//this how we export json data
module.exports = mongoose.model("Bootcamp", BootcampSchema);
