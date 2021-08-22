const User = require("../models/user");
const { formatResStandar } = require("../helpers/formatRes");


exports.usuarioPorId = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        
        if (err || !user) {
            const msgError = formatResStandar(0,'Usuario no encontrado',[err]);

            return res.status(400).json(msgError);
        }
        req.user = user;
        next();
    });
};
exports.update = (req, res) => {
    const user = req.user;
    user.name = req.body.name;
    user.email = req.body.email;
    user.avatar = req.body.avatar;
    user.save((err, data) => {
        if (err || !data) {
            const msgError = formatResStandar(0,'Error al actualizar el usuario',[err]);
            return res.status(503).json(msgError);
        }
        const msgSuccess = formatResStandar(0,'Usuario actualizado',[user.toJsonResponse()]);
        return res.status(200).json(msgSuccess);
    });
};
exports.leerUsuario = (req, res) => {
    const msgSuccess = formatResStandar(0,'Usuario encontrado',[req.user.toJsonResponse()]);
    return res.status(200).json(msgSuccess);
};

exports.eliminarUsuario = (req, res) => {
    const user = req.user;
    user.remove((err, data) => {
        if (err || !data) {
            const msgError = formatResStandar(-10,'Ocurrio un error al eliminar el usuario',[err]);
            return res.status(503).json(msgError);
        }
        const msgSuccess = formatResStandar(-10,'Usuario eliminado correctamente',data);
        return res.status(200).json(msgSuccess);
    });
};

exports.listarUsuario = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;


    User.find()
        .select("-salt -hashed_password -__v")
        .sort([
            [sortBy, order]
        ])
        .limit(limit)
        .exec((err, users) => {
            if (err || !users) {
                const errorMsg = formatResStandar(-10,'Error al listar usuarios',[err])
                return res.status(400).json(errorMsg);
            }
            const msgSuccess = formatResStandar(0,'Lista ok',users);
            return res.status(200).json(msgSuccess);
        });
};