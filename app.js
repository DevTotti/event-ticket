require('dotenv').config({path: './credentials.env'});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

//routes
const userRoutes = require('./app/Routes/user_route');
const eventRoutes = require('./app/Routes/ticket_route')




// Connections
const PORT = process.env.PORT;
const MONGO_CLOUD_URI = process.env.MONGO_CLOUD_URI


const app = express();



// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Database & server connection
mongoose.connect(MONGO_CLOUD_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("Connected to MongoDB!");
        app.listen(PORT);
        console.log(`Listening to post ${PORT}`);
        
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB!");
    });


//ROUTES

//user routes
app.use('/users', userRoutes);

//event routes
app.use('/event', eventRoutes);


// Error handling
app.use((req, res) => {
    res.status(400).json({
        message: 'Page not found!'
    })
});