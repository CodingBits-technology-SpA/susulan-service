const Perfil = require("../models/profile")
const { formatResStandar } = require("../helpers/formatRes");

exports.profilePorId = (req,res) => {
    
    Perfil.findById(req.body.id).exec( (err,perfilDB) => {
        if(err || !perfilDB){
            const msgPefilNoExists = formatResStandar(-10,'No se encontro el perfil.',[err]);
            return res.status(404).json(msgPefilNoExists);
        }
        const msgProfileSuccess = formatResStandar(0,'Perfil encontrado.',[perfilDB]);
        
        return res.status(200).json(msgProfileSuccess);
    });
}
exports.profileLeerTodo = (req,res) => {
    Perfil.find().exec( (err,perfilDB) =>{
        if(err){
            const msgError = formatResStandar(-10,'Ocurrio un error al intentar obtener registros',[err]);
            return res.status(503).json(msgError);
        }
        const msgSuccess = formatResStandar(0,'Lista de perfiles',[perfilDB]);

        return res.json(200).json(msgSuccess);
    })

}
exports.profileActualizar = (req,res) => {

}
exports.profileEliminar = (req,res) => {

}