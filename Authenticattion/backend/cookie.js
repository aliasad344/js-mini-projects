const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hi")
})
app.get("/test-cookie", (req, res) => {
  res.cookie("testCookie", "testValue", {
    httpOnly: true,
    maxAge: 3600000, // 1 hour
    sameSite: "lax",
    // Add secure: true for production with HTTPS
  });

  res.send("Test cookie set!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
