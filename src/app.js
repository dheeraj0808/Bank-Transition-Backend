const express = require("express");

const authRouter = require("./routes/auth.routes");

const app = express();

app.use(express.json());
// here we are using the express.json() middleware to parse the incoming request body
// and convert it into a javascript object

app.use("/api/auth", authRouter);
// here we are using the authRouter to handle the authentication routes
// and we are using the authRouter to handle the authentication routes
// and we are using the authRouter to handle the authentication routes   


module.exports = app;
