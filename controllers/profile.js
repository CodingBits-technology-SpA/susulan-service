const Perfil = require("../models/profile")
const { formatResStandar } = require("../helpers/formatRes");

exports.profilePorId = (req,res,next) => {
    
    Perfil.findById(req.body.id).exec( (err,perfilDB) => {
        if(err || !perfilDB){
            const msgPefilNoExists = formatResStandar(-10,'No se encontro el perfil.',[err]);
            return res.status(404).json(msgPefilNoExists);
        }
        req.profile = perfilDB;
        next();
    });
}
exports.profileLeer = (req, res) => {
    const profileResponse = formatResStandar(0,'Perfil encontrando.',[req.profile]);
    return res.status(200).json(profileResponse);
};
exports.profileLeerTodo = (req,res) => {

    Perfil.find().exec( (err,perfilDB) =>{
        if(err || !perfilDB){
            const msgError = formatResStandar(-10,'Ocurrio un error al intentar obtener registros',[err]);
            return res.status(503).json(msgError);
        }
        const msgSuccess = formatResStandar(0,'Lista de perfiles',[perfilDB]);

        return res.json(200).json(msgSuccess);
    })

}
exports.profileActualizar = (req,res) => {

    const profile = req.profile ;

    profile.name = req.body.name;
    profile.description = req.body.description;

    profile.save( (err,profileDB) =>{
        if(err || !profileDB){
            const msgErrorUpdate = formatResStandar(-10,'Error al actualizar el perfil',[err]);
            return res.status(503).json(msgErrorUpdate);
        }
        const msgProfileSuccess = formatResStandar(0,'Actualizado correctamente',[profileDB]);
        return res.status(200).json(msgProfileSuccess);
    });


}
exports.profileEliminar = (req,res) => {
    const profile = req.profile;
    profile.remove( (err,profileDB)=> {
        if(err || !profileDB){
            const msgErrorRemove = formatResStandar(-10,'Error al eliminar el perfil.',[err]);
            return res.status(503).json(msgErrorRemove);
        }
        const msgProfileSuccess = formatResStandar(0,'Eliminado correctamente.',[profileDB]);
        return res.status(200).json(msgProfileSuccess);
    });

}