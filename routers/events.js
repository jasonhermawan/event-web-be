const { eventsController } = require("../controllers");
const {createEvent} = require("../controllers/events")
const { uploader } = require("../helper/uploader");
const { validateToken, validateUser } = require("../middleware/validation");
const router = require("express").Router();

// router.get("/", eventsController.getAllEvents);
// router.get("/:id", eventsController.getEventById);
router.get("/", eventsController.getEvents);
router.get("/all", eventsController.getAllEvents);
router.get("/past", eventsController.getPastEvents);
router.post("/", uploader("/events").single("fileupload"), eventsController.createEvent)


// router.post(
//   "/",
// //   validateToken,
// //   validateUser,
//   uploader("/events").single("fileupload"),
//   createEvent
// );
// router.patch("/:id", eventsController.updateEvent);
// router.delete("/:id", eventsController.deleteEvent);

module.exports = router;
