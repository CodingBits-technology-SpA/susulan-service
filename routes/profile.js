const express = require("express");
const router = express.Router();

const { userPropertyToken,isToken,requireSignin,isAuth,isAdmin} = require("../controllers/auth");
const { profilePorId,profileCrear,profileLeer,profileLeerTodo,profileActualizar,profileEliminar } = require("../controllers/profile");
const { validaProfile } = require("../validators/profile");

// rutas

router.post("/profile",userPropertyToken,isToken,requireSignin,isAuth,validaProfile,profileCrear);
router.put("/profile/:profileId",userPropertyToken,isToken,requireSignin,isAuth,validaProfile,profileActualizar);
router.delete("/profile/:profileId",userPropertyToken,isToken,requireSignin,isAuth,profileEliminar);
router.get("/profile/:profileId",userPropertyToken,isToken,requireSignin,isAuth,validaProfile,profileLeer);
router.get("/profile/",userPropertyToken,isToken,requireSignin,isAuth,profileLeerTodo);

// params
router.param("profileId", profilePorId);
