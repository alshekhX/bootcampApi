const mongoose = require("mongoose");

const dbConnect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(
    `mongo db connection :${conn.connection.host}`.blue.underline.bold
  );
};
module.exports = dbConnect;
