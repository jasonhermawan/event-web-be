const { eventsController } = require("../controllers");
const router = require("express").Router();

router.get("/", eventsController.getEvents);

module.exports = router;