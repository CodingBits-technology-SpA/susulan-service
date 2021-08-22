const express = require("express");
const router = express.Router();

const { isToken,requireSignin} = require("../controllers/auth");
const { profilePorId,profileCrear,profileLeer,profileLeerTodo,profileActualizar,profileEliminar } = require("../controllers/profile");
const { validaProfile } = require("../validators/profile");

// rutas

router.post("/profile",requireSignin,isToken,validaProfile,profileCrear);
router.put("/profile/:profileId",requireSignin,isToken,validaProfile,profileActualizar);
router.delete("/profile/:profileId",requireSignin,isToken,profileEliminar);
router.get("/profile/:profileId",requireSignin,isToken,profileLeer);
router.get("/profile/",requireSignin,isToken,profileLeerTodo);

// params
router.param("profileId", profilePorId);

module.exports = router;
