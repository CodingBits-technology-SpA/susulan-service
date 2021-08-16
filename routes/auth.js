const express = requiere("express");
const router = express.router();

const { registrarse, login, cerrarSesion} = require("../controllers/auth");
const { validaRegistro,validaLogin,isJsonValidRequest } = require("../validators/index");

// rutas

router.post("/registrarse",validaRegistro,registrarse);
router.post("/login",validaLogin, login);
router.get("/cerrarSesion", cerrarSesion);

module.exports = router;

