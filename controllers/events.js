const { events, accounts, formats, topics, cities } = require("../models");

module.exports = {
  getEvents: async (req, res, next) => {
    try {
      const result = await events.findAll({
        include: [
          {
            model: accounts,
            required: false,
          },
          {
            model: formats,
            required: true,
          },
          {
            model: topics,
            required: true,
          },
          {
            model: cities,
            required: true,
          },
        ],
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