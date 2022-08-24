const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const home = require("../routes/home");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', "public")));
app.set("view engine", ejs);

app.use("/", home);

app.listen(process.env.PORT || 3000, (error) => {
    if(error)
        return console.log(`Error: ${error}\n`);
    return console.log("Server Started");
});
