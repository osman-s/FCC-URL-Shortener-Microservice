"use strict";


var express = require("express");
var app = express();
var mongo = require('mongodb');

var cors = require("cors");


// Basic Configuration

/** this project needs a db !! **/

// mongoose.connect(process.env.MONGOLAB_URI);
/** this project needs to parse POST bodies **/
// you should mount the body-parser here
require("./startup/db")();
require('./startup/routes')(app);


app.use(cors());



var port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log("Node.js listening ...");
});

module.exports = server;
