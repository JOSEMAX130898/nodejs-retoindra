const express = require("express");
const router = express.Router();
const Controller = require("./controller");
const user_auth = require('../../middlewares/auth');

router.get("/vehiculos", Controller.vehiulosListar);
router.get("/personas", Controller.personasListar);

module.exports = router;