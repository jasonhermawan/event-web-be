const {eventsController} = require("../controllers");
const router = require("express").Router();

router.get("/", eventsController.getAllEvents);
router.get("/:id", eventsController.getEventById);
router.post("/", eventsController.createEvent);
router.patch("/:id", eventsController.updateEvent);
router.delete("/:id", eventsController.deleteEvent);

module.exports = router;