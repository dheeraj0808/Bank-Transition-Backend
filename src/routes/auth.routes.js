const express = require("express");

const authRouter = require("../controllers/auth.controller");
// is line ka matlab ye hai ki const authRouter is requiring the auth.controller.js file
// and exporting it to the auth.routes.js file
// auth.controller.js is the file that contains the logic for authentifation 


const app = express();
router.post("/register", authController.register);
router.post("/login", authController.login);




module.exports = app