
const jwt = require("jsonwebtoken");
const https = require('https');
var db = require('../public/javascripts/db');

const fs = require("fs");



const verifyToken = async(req, res, next) => {
  
const Id = req.params.LoginId;
  
  const tokendata =await db.getAllAuthKey(Id);

  
  const token = await Promise.resolve(tokendata[0].JWTKEY);
      console.log("data" + JSON.stringify(token));
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded =  jwt.verify(token,process.env.JWT_KEY);
    console.log("decode"+decoded)
    
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;