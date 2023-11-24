const { topicsController } = require("../controllers");
const router = require("express").Router();

router.get("/", topicsController.getTopics);

module.exports = router;