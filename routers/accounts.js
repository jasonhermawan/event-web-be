const {accountsControllers} = require("../controllers")
const router = require("express").Router()


router.get("/" , accountsControllers.getData); 
router.get("/role", accountsControllers.checkRole);
router.post("/register" , accountsControllers.register); 
router.post("/login" , accountsControllers.login); 
router.patch("/reset-password"  , accountsControllers.resetPass);


module.exports = router;