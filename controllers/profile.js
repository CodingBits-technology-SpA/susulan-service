const Perfil = require("../models/profile")
const { formatResStandar } = require("../helpers/formatRes");

exports.profilePorId = (req,res) => {
    
    Perfil.findById(req.id).exec( (err,perfilDB) => {
        if(err || !perfilDB){
            const msgPefilNoExists = formatResStandar(-10,'No se encontro el perfil.',[err]);
            return res.status(404).json(msgPefilNoExists);
        }
        const msgProfileSuccess = formatResStandar(0,'Perfil encontrado.',[perfilDB]);
        
        return res.status(200).json(msgProfileSuccess);
    });
}
exports.profileLeerTodo = (req,res) => {

}
exports.profileActualizar = (req,res) => {

}
exports.profileEliminar = (req,res) => {

}