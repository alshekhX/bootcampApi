const nodeGeoCoder=require('node-geocoder');

const options={
httpAdabter:'https',
provider:'mapquest',
apiKey:'F9iIIcw7RbcAGgLhzCForNkPLiS1zB9t',
formatter:null

}

const geocoder =nodeGeoCoder(options);

module.exports=geocoder;