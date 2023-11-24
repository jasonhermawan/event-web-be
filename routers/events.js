const {accountsControllers} = require("../controllers")
const router = require("express").Router()


router.get("/" , accountsControllers.getData) 



module.exports = router;