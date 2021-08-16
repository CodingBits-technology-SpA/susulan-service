const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
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

exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth.id;
    if (!user){
        const msgAuthDenegation = formatResStandar(-10,"Acceso denegado",[]);
        return res.status(403).json(msgAuthDenegation);
    }

    next();
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty:"auth"
});

exports.cerrarSesion = (req,res) => {
    const msgCloseSesion = formatResStandar(0,"Cerrar sesión con éxito",[]);
    res.clearCookie("t");
    return res.status(200).json(msgCloseSesion);
}
exports.isToken = (err,req,res,next) => {
    
    if(err.name === 'UnauthorizedError'){
        const msgError  = formatResStandar(-10,"Token invalido",[]);
        
        return res.status(403).json(msgError);
    }

    next();
}
exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        const msgAccesDenegation = formatResStandar(-10,'Acceso denegado,sólo el admin tiene acceso a este recurso.',[]);

        return res.status(403).json(msgAccesDenegation);
    }

    next();
}