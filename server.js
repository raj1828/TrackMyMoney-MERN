const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');
const path = require('path');
// config don env file
dotenv.config();
//database call
connectDb();

const app = express();

// middlware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes
//user Routes
app.use('/api/v1/users', require('./routes/userRoute'))
// transection Routes
app.use('/api/v1/transections', require('./routes/transectionRoutes'))

//static files
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function (req, res) {
       res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.get('/', (req, res) => {
       res.send("Welcome to Server!");
});

const PORT = 8080 || process.env.PORT
app.listen(PORT, () => {
       console.log(`listening on port ${PORT}`);
});