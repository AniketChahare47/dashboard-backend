// const mongoose = require ('mongoose');
// const mongoURI = "mongodb://https://dashboard-backend-trcc.onrender.com:27017/ebook"
// const connectToMongo = async() => {
//   try{
//     mongoose.set('strictQuery',false)
//     await mongoose.connect(mongoURI);
//     console.log("connected to Mongo Successfully");
//   }
//   catch(error){
//         console.log("error connecting to MongoDB:",error);
//   }
// }
// module.exports=connectToMongo;
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(mongoURI);

    console.log("✅ Connected to MongoDB Successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;