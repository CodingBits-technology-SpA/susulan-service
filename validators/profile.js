const { formatResStandar } = require("../helpers/formatRes");


exports.validaProfile = (req, res, next) => {
    req.check("name", "Nombre es requerido").notEmpty();
    req.check("name", "Nombre debe contener entre 4 a 32 caracteres")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("description", "Descripción es requerida").notEmpty();
    req.check("description")
        .isLength({
            min: 6
        })
        .withMessage("Descripción debe tener un mínimo de 6 caracteres")
        
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        const msgError = formatResStandar(-10,firstError,[errors])
        return res.status(400).json(msgError);
    }
    next();
};
