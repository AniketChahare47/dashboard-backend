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

const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = "mongodb://127.0.0.1:27017/ebook"; 
// 👆 127.0.0.1 safer hai than https://dashboard-backend-trcc.onrender.com

const connectToMongo = async () => {
  try {
    mongoose.set('strictQuery', false); // optional
    await mongoose.connect(mongoURI);   // no extra options needed in Mongoose v6+
    console.log("✅ Connected to MongoDB Successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // exit if DB connection fails
  }
};

module.exports = connectToMongo;
