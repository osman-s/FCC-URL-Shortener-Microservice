const mongoose = require("mongoose");
const express = require("express");
const { Link, validate } = require("../models/link.model");
const randomstring = require("randomstring");
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.get("/:urllink", async function(req, res) {
  const urllink = req.params.urllink;
  console.log(urllink);
  let link = await Link.findOne({ short: urllink });
  if (link) {
    return res.redirect(link.url)
  }
  else {
    res.json({ message: "Invalid shortcut" });
  }
});

router.post("/", urlencodedParser, async (req, res) => {
  const urllink = req.body.url
  let link = await Link.findOne({ url: urllink }).select("url short -_id");
  if (link) {
    return res.json(link);
  } else if (!validate(urllink)) {
    return res.status(400).json({ message: "Invalid web-address" });
  } else {
    link = new Link({
      url: urllink
    });
    await generateShort(link);

    await link.save();
    link = await Link.findOne(link).select("url short -_id");
    res.json(link);
  }
});

async function generateShort(link) {
  let num = Math.round(Math.random() * 10);
  var short = randomstring.generate(num);
  let cup = await Link.findOne({ short: short });
  if (!cup) {
    link.short = short;
    return;
  } else {
    generateShort();
  }
}
// async function correctLink(urllink) {
//     let newurl = await urllink
//     if (/^www./.test(urllink)) {
//         return newurl = await urllink.replace(/^www./, "https://www.");
//     }
//     if (!/^www./.test(urllink)) {
//         return newurl = await'https://www.' + urllink;
//     }
// }
module.exports = router;
