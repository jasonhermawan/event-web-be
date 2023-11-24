const {events} = require("../models")

module.exports={
    getData: async (req , res , next )  => {
        try {
            const result = await events.findAll({
                where: req.query,
                order: [["id", "ASC"]]
            });
            return res.status(200).send(result)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    },
}
