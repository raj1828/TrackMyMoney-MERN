const mongoose = require('mongoose')
const colors = require('colors')

const connectDb = async () => {
       try {
              await mongoose.connect(process.env.MONGO_URL);
              console.log(`Database is connected to ${mongoose.connection.host}`.bgCyan.white);
       } catch (error) {
              console.error(`${error}`.bgRed)
       }
};

module.exports = connectDb;