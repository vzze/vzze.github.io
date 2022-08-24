const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static(path.join(__dirname, '..', "public")));

module.exports = router;
