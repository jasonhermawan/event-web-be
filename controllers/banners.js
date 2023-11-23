// const banners  = require("../models");
const banners = require("../models").banners;
const fs = require("fs");

module.exports = {
  createBanner: async (req, res, next) => {
    try {
      // const {idevent} = req.body;
      // const {filename} = req.file;

      const result = await banners.create({
        images: req.file.filename,
      });
      return res.status(200).send({
        message: "Success Upload banner ke SQL",
        banner: result,
      });
    } catch (error) {
      console.log(error);
      fs.unlinkSync(`./${req.file.path}`);
      return res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
