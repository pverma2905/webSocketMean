const express = require("express");
const Router = express.Router();
const {generateToken} = require("../controller/socketController");

Router.post("/generate",generateToken)
module.exports = Router