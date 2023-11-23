const express = require("express");
const router = express.Router();

const { bannersController } = require("../controllers");
const { uploader } = require("../helper/uploader");
const { validateToken, validateUser } = require("../middleware/validation");

// router.get("/", bannersController.getAllBanners);
// router.get("/:id", bannersController.getBannerById);
router.post(
  "/",
//   validateToken,
//   validateUser,
  uploader("/banners").single("fileupload"),
  bannersController.createBanner
);

module.exports = router;