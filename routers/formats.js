const { formatsController } = require("../controllers");
const router = require("express").Router();

router.get("/", formatsController.getFormat);

module.exports = router;