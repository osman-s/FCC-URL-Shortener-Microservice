const express = require("express");
const home = require("../routes/home");
const links = require("../routes/links");

module.exports = function(app) {
  app.use("/public", express.static(process.cwd() + "/public"));
  app.use("/", home);
  app.use("/links/", links);
};
