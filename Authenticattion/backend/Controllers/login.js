const bcrypt = require("bcrypt");
const express = require("express");
const dbconnection = require("../sqlconnection");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

const loginhandler = (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Fill all the fields" });
    return;
  }
  
  dbconnection.query("SELECT * FROM register WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log("Error while fetching data from db");
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (result.length === 0) {
        console.log('Email not found')
      res.send({ message: "Email not found" });
      return;
    }
    ;

    const hashpassword = result[0].password;
    bcrypt.compare(password, hashpassword, (err, isPasswordMatch) => {
      if (err) {
        console.error("Error while comparing password", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      

      if (isPasswordMatch) {
        console.log("Password is correct");

        const payload = { email: result[0].email };
        const tokenOptions = { expiresIn: "1h" };
        const secret_key = "kjsdkjsdiKH*&*^%$%$#hgjdhfkjdsfkjfsdh";

        jwt.sign(payload, secret_key, tokenOptions, (err, token) => {
          if (err) {
            console.log("Error while generating jwt token", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }

          res.send({"message":"Login successfully", "token":token} );
        });
      } else {
        console.log("Password is not correct");
        res.send({ "message": "Invalid password" });
      }
    });
  });
};

// Assuming you have defined other routes and error handlers here...

module.exports = {
  loginhandler,
  // Other exported functions and routes...
};
