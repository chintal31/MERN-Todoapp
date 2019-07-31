const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

let routes = require('./routes');

//For allowing cross origin resource sharing.
app.use(cors());
//For parsing URL data and assembling for easy extraction.
app.use(bodyParser.json());

//Database connectivity
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
mongoose.connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//Routing
routes(app);

//Configuring server to listen to specific port.
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
