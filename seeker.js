//to access  json database data file
const fs=require('fs');

//use the file in the mongoose database
const mongoose = require('mongoose');
const colors= require('colors');


const dotenv=require('dotenv');

dotenv.config({
    path:'./confiq/confiq.env'
});



const Bootcamp= require('./model/Bootcamp');
const { json } = require('express');

//mongoose conn


   mongoose.connect('mongodb+srv://alshekhnodejs:alshekhnodejs@cluster0.g22gn.mongodb.net/devCamper', {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


//read json file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`),'utf-8');




//import into database
const importData= async()=>{


    try{
await Bootcamp.create(bootcamps);

console.log('database imported successfully'.green.inverse)
process.exit();

}
catch(err){

    console.log('database not imported'.red);
    console.log(err);

}

} 



//delete the database
const deleteDatabase= async()=>{


    try{
await Bootcamp.deleteMany();

console.log('database deleted successfully'.red.inverse)
process.exit();

}
catch(err){

    console.log('database not deleted'.red.strip);
}

} 

if(process.argv[2]==='-i'){

    importData();
}
else if(process.argv[2]==='-d'){

    deleteDatabase();
}



