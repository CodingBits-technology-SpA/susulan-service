exports.validaUserUpdate = (req, res, next) => {
    req.check("name", "Nombre es requerido").notEmpty();
    req.check("name", "Nombre debe contener entre 3 a 32 caracteres")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("email", "Email es requerido").notEmpty();
    req.check("email", "Email debe contener entre 3 a 32 caracteres")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });

    req.check("avatar", "Avatar es requerido").notEmpty();
    req.check("avatar", "Avatar debe contener entre 3 a 32 caracteres")
        .isLength({
            min: 4,
            max: 32
        });
    // valida que el array tenga la propiedad profile_id
    req.check("role", "Perfil es requerido").notEmpty();
    req.check("arr.*.profile_id","Debe contener un array con los id del perfil o los perfiles asignados.").not().isEmpty();

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            rc: -10,
            msg: firstError,
            data: [errors]
        });
    }
    next();
};