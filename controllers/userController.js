const userModel = require('../models/userModel');

// login callback
const loginContoller = async (req, res) => {
       try {
              const { email, password } = req.body;
              // Log the received payload
              console.log('Received payload:', req.body);

              const user = await userModel.findOne({ email, password });
              if (!user) {
                     return res.status(200).send("User not found");
              }
              res.status(200).json(
                     {
                            success: true,
                            user
                     }
              );
       } catch (error) {
              res.status(400).json({ success: false, error });
       }
};

// register Callbacks
const registerContoller = async (req, res) => {
       try {
              const { name, email, password } = req.body;

              // Log the received payload
              console.log('Received payload:', req.body);

              // Check for missing fields
              if (!name || !email || !password) {
                     console.log('Validation failed: Missing fields');
                     return res.status(400).json({ success: false, message: 'All fields are required' });
              }

              // Create new user instance
              const newUser = new userModel({ name, email, password });

              // Save new user to the database
              await newUser.save();
              console.log('User registered successfully:', newUser);

              res.status(201).json({
                     success: true,
                     newUser,
              });
       } catch (error) {
              console.error('Error occurred:', error.message);
              res.status(400).json({ success: false, error: error.message });
       }
};


module.exports = { loginContoller, registerContoller };