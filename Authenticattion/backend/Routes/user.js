const express = require("express");
const route = express.Router();
const { registerhandler } = require("../Controllers/register");
const {loginhandler} = require("../Controllers/login")
const {homehandler} = require("../Controllers/home")
const cookieParser = require("cookie-parser");


route.use(cookieParser());


route.use(express.json());

route.post("/register", registerhandler);
route.post("/login", loginhandler);
route.get("/home", homehandler); 

module.exports = route;
