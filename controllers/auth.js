const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandeler} = require("../helpers/dbErrorHandler");
const { formatResStandar } = require("../helpers/formatRes");

exports.registrarse = (req,res) => {

    const user = new User(req.body);
    
    user.save( (err,user) => {
        if(err) {
            const payloadError = formatResStandar( -10,err.message(),[err]);
            return res.status(500).json(payloadError);
        }

    });
};