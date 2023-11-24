const { citiesController } = require("../controllers");
const router = require("express").Router();

router.get("/", citiesController.getCities);

module.exports = router;