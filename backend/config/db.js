const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
