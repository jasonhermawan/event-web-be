const { topics } = require("../models");

module.exports = {
  getTopics: async (req, res, next) => {
    try {
      const result = await topics.findAll({
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