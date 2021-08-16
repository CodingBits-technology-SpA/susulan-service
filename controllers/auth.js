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
        return res.status(200).json( 
            formatResStandar(0,"Usuario creado con exito",[user.toJSON()]) 
        );
    });
  
};

exports.login = (req, res ) => {

    const {  email, password } = req.body ;
    
    User.findOne({email} , (error,userDB) => {

        if (error || !userDB) {
            const payloadError = formatResStandar(-10,'No existe un usuario con ese email. Por favor registrarse', []);
            return res.status(404).json(payloadError);
        }
        if (!userDB.authenticate(password) ) {
            const msgInvalidCrendentials = formatResStandar(-10,"Contraseña o email inválido", []);
            return res.status(403).json(msgInvalidCrendentials);
        }

        const token = jwt.sign({
            _id :userDB.id 
        },process.env.JWT_SECRET, {
            expiresIn:  30 * 24 * 360
        });
        res.cookie("t",token,{
            expire: new Date() + 30 * 24 * 3600
        });

        const { _id , name,email } = userDB;
        const dataUser = { token:token , user: {_id :_id,name:name , email:email} };
        const payloadSuccess = formatResStandar(0,"Login exitoso",[dataUser]);

        return res.status(200).json(payloadSuccess);

        
    });

}

