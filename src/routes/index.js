const express = require("express")
const router = express.Router();

const productoRouter = require("../components/producto/routes");
const swapiRouter = require("../components/swapi/routes");

router.use("/producto", productoRouter);
router.use("/swapi", swapiRouter);
// router.use("/sublinea", sublineaRouter);
// router.use("/clase", claseRouter);

module.exports = router;
