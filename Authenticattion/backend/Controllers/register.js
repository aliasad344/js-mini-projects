const dbconnection = require("../sqlconnection");
const bcrypt = require('bcrypt');

const registerhandler = (req, res) => {
  const { name, email, password, cpassword } = req.body;
  // res.send("Register route working")

  if (!name || !email || !password || !cpassword) {
    res.send("Please fill all the fields");
    return;
  } else if (password !== cpassword) {
    res.send("Password doesn't match with the Confirm Password");
    return;
  }

  // Hashing using bcrypt
  bcrypt.hash(password, 13, (err, hashpassword) => {
    if (err) {
      console.log("Error while creating hash password");
      res.send("Error while creating hash password");
      return;
    }
    console.log(hashpassword);

    // db connection
    dbconnection.connect((err) => {
      if (err) {
        console.log("Error while connecting to database", err);
        res.send("Error while connecting to database");
        return;
      }
      console.log("Connected to database Successfully!");

      dbconnection.query("SELECT * FROM register WHERE email = ?", [email], (err, result) => {
        if (err) {
          console.log("Error while querying database", err);
          res.send("Error while querying database");
          return;
        }

        if (result.length > 0) {
          res.send("Email already exists");
          return;
        } else {
          dbconnection.query("INSERT INTO register (name, email, password) VALUES (?, ?, ?)", [name, email, hashpassword], (err, result) => {
            if (err) {
              console.log("Error while inserting into database", err);
              res.send("Error while inserting into database");
              return;
            } else {
              console.log("Registered Successfully");
            //   console.log(result);
             res.send("Registered Successfully");
              // res.redirect("/login");
              return;
            }
          });
        }
      });
    });
  });
};

module.exports = {
  registerhandler,
};
