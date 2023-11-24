const { cities } = require("../models");

module.exports = {
  getCities: async (req, res, next) => {
    try {
      const result = await cities.findAll({
        where: req.query,
        attributes: {exclude: ["createdAt", "updatedAt"]},
        order: [["id", "ASC"]],
      });
      return res.status(200).send(result) 
    } catch (error) {
      console.log(error);
      return res.status(500).send(error)
    }
  }
}