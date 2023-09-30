const express = require('express');
const app = express();
const route = require("./Routes/user");
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(cookieParser());


require("dotenv").config();

//Middlewares
app.use(cors())



//Variables
const PORT = process.env.PORT;

//Routes
app.use("/api", route);


app.get("/", (req,res)=>{
  res.send({data:"Success"})
  console.log('DADKAD')
})

app.listen(PORT, ()=>{
  console.log(`Server is listening at http://localhost:${PORT}`)
})