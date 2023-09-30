const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
const jwt = require("jsonwebtoken");

const homehandler = async (req, res) => {
  await validateUser(req, res, () => {
    console.log("User is validated");
    // Handle further logic for the authenticated user here
    res.send("hi");
  });
};

const validateUser = (req, res, next) => {
  const token = req.cookies.token;
  const secret_key = "kjsdkjsdiKH*&*^%$%$#hgjdhfkjdsfkjfsdh";
  if (token) {
    console.log("Token mil gyaa",token);
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        console.log("Invalid Token");
        res.status(401).json({ "message": "Invalid token" });
      } else {
        console.log("Authorized access");
        req.user = decoded;
        next();
      }
    });
  } else {
    console.log("Token not found");
    res.redirect("/login");                                                                                                             
  }
};

module.exports = { homehandler };
