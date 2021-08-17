const express = require("express");
const router = express.Router();

const { registrarse, login, cerrarSesion} = require("../controllers/auth");
const { validaRegistro,validaLogin } = require("../validators");

// rutas

router.post("/registrarse",validaRegistro,registrarse);
router.post("/login",validaLogin, login);
router.get("/cerrarSesion", cerrarSesion);

module.exports = router;

