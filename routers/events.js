const { eventsControllers} = require("../controllers")
const router = require("express").Router()


router.get("/" , eventsControllers.getData) 



module.exports = router;