const mongoose = require("mongoose");

module.exports = function() {
  const url = "mongodb+srv://osman:picotime@cluster0-sheam.mongodb.net/test?retryWrites=true&w=majority";
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${url}...`));

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
};

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = "mongodb+srv://osman:picotime@cluster0-sheam.mongodb.net/test?retryWrites=true&w=majority";

// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   client.close();
// });
// }
