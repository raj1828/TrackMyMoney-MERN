const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
       name: {
              type: String,
              required: [true, "name is required"]
       },
       email: {
              type: String,
              required: [true, "email is required and Unique"],
              unique: true
       },
       password: {
              type: String,
              required: [true, "password is required"]
       },
},
       { timestamps: true }
);

const userModel = new mongoose.model('user', userSchema);
module.exports = userModel;