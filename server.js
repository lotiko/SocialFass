/**
 *
 * @author: lotiko
 * @date:  04/2021
 *
 * @summary: Server file of the app
 */

const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

hbs.registerPartials(__dirname + "/views/partials");
mongoose.connect("mongodb://localhost:27017/myFaasDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app
  .set("view engine", "hbs")
  .set("views", path.join(__dirname, "views"))
  .use(express.static(path.join(__dirname, "public")));

app
  .get("/", (req, res) => {
    res.status(301);
    res.redirect("/home");
  })
  .get("/home", (req, res) => {
    res.render("home", { title: "Home" });
  });

app.listen(8002, () => console.log("Server ready on localhost:8002"));
