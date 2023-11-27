const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");
const bycrypt = require("bcrypt");
const util = require('util');

const { events, accounts, formats, topics, cities, tickets, banners } = require("../models");

const uploader = require("../helper/uploader");
const { Op, Sequelize, fn } = require("sequelize");
// const banners = require("./banners");

module.exports = {
  // Exlude past events & With limit for pagination
  getEvents: async (req, res, next) => {
    let date = new Date();
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });
    let formattedDate = year + "-" + month + "-" + day;

    const queryCondition = {
      ...req.query
    }
    const customCondition = {
      endDate: {
        [Op.gt]: formattedDate,
      },
      page: parseInt(req.query.page) || 1,
      sortby: req.query.sortby || "ASC",
    }

    const combinedConditions = { ...queryCondition, ...customCondition };

    const condition = customCondition.sortby;

    const pageSize = 4;
    const offset = (combinedConditions.page - 1) * pageSize;
    delete combinedConditions.page
    delete combinedConditions.sortby
    try {
      const result = await events.findAll({
        include: [
          {
            model: accounts,
            required: true,
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
          {
            model: tickets,
            required: true,
          },
          {
            model: banners,
            required: true,
          }
        ],
        // order: [["startDate", "ASC"]],
        order: [[`startDate`, `${condition}`]],
        where: combinedConditions,
        limit: pageSize,
        offset: offset,
        attributes: {exclude: ["accountId", "cityId", "topicId", "formatId", "createdAt", "updatedAt"]},
      });
      return res.status(200).send(result) 
    } catch (error) {
      console.log(error);
      return res.status(500).send(error)
    }
  },
  getAllEvents: async (req, res, next) => {
    let date = new Date();
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });
    let formattedDate = year + "-" + month + "-" + day;
    const queryCondition = {
      ...req.query
    }
    const customCondition = {
      endDate: {
        [Op.gt]: formattedDate,
      },
      page: parseInt(req.query.page) || 1,
      sortby: req.query.sortby || "ASC",
    }
    const combinedConditions = { ...queryCondition, ...customCondition };
    delete combinedConditions.page
    delete combinedConditions.sortby
    try {
      const result = await events.findAll({
        include: [
          {
            model: accounts,
            required: true,
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
          {
            model: tickets,
            required: true,
          },
          {
            model: banners,
            required: true,
          }
        ],
        order: [["startDate", "ASC"]],
        where: combinedConditions,
        attributes: {exclude: ["createdAt", "updatedAt"]},  
    })
    return res.status(200).send(result)
    } catch (error) {
      console.log(error);
      return res.status(500).send(error)
    }
  },
  getPastEvents: async (req, res, next) => {
    let date = new Date();
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });
    let formattedDate = year + "-" + month + "-" + day;
    const queryCondition = {
      ...req.query
    }
    const customCondition = {
      endDate: {
        [Op.lt]: formattedDate,
      },
      page: parseInt(req.query.page) || 1,
    }
    const combinedConditions = { ...queryCondition, ...customCondition };
    delete combinedConditions.page
    try {
      const result = await events.findAll({
        include: [
          {
            model: accounts,
            required: true,
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
          {
            model: tickets,
            required: true,
          },
          {
            model: banners,
            required: true,
          }
        ],
        order: [["startDate", "ASC"]],
        where: combinedConditions,
        attributes: {exclude: ["createdAt", "updatedAt"]},  
    })
    return res.status(200).send(result)
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  createEvent: async (req, res, next) => {
    try {
      // Check user token
      // let token = req.token;
      // const accountData = jwt.verify(token, process.env.SCRT_TKN);
      // if (accountData.role === "promotor") {
        const result = await events.create({
          accountid: req.body.accountid,
          name: req.body.name,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          price: req.body.price,
          cityid: req.body.cityid,
          location: req.body.location,
          banner: req.body.banner,
          formatid: req.body.formatid,
          topicid: req.body.topicid,
          description: req.body.description,
          type: req.body.type,
        });

        if (req.file) {
          await banners.create({
            eventid: result.id,
            image: req.file.filename
          })
        }
        
        return res.status(201).send({
          success: true,
          message: "Create event success"
        })
      // } else {
      //   return res.status(400).send({
      //     success: false,
      //     message: "You are not a store. Access denied"
      //   })
      // }
    } catch (error) {
      console.log(error);
      if (fs.existsSync(`./${req.file}`)) {
          fs.unlinkSync(`./${req.file.path}`)
      }
      return res.status(500).send(error)
    }
  },




  // createEvent: async (req, res, next) => {
  //   try {
  //     const {
  //       eventName,
  //       startDate,
  //       endDate,
  //       startTime,
  //       endTime,
  //       eventLocation,
  //       eventCity,
  //       paidTickets,
  //       freeTickets,
  //       eventFormat,
  //       eventTopic,
  //     } = req.body;

  //     const resultFormat = await event_format.create({
  //       format: eventFormat,
  //     });
  //     const idformat = resultFormat.id;

  //     const resultTopic = await event_topic.create({
  //       topic: eventTopic,
  //     });
  //     const idtopic = resultTopic.id;

  //     const resultEvent = await event_details.create({
  //       name: eventName,
  //       startDate,
  //       endDate,
  //       startTime,
  //       endTime,
  //       location: eventLocation,
  //       city: eventCity,
  //       idformat,
  //       idtopic,
  //       idcategory: 1,
  //     });

  //     const idevent = resultEvent.id;

  //     if (paidTickets && paidTickets.length > 0) {
  //       for (const ticketo of paidTickets) {
  //         await ticket.create({
  //           name: ticketo.name,
  //           qty: ticketo.qty,
  //           price: ticketo.price,
  //           type: "paid",
  //           idevent,
  //         });
  //       }
  //     }

  //     if (freeTickets && freeTickets.length > 0) {
  //       for (const ticketo of freeTickets) {
  //         await ticket.create({
  //           name: ticketo.name,
  //           qty: ticketo.qty,
  //           type: "free",
  //           idevent,
  //         });
  //       }
  //     }

  //     // Create banners if available
  //     if (req.file) {
  //       const result = await banners.create({
  //         filename: req.file.filename,
  //         path: req.file.path,
  //         idevent: resultEvent.id,
  //       });
  //     }

  //     const token = jwt.sign(
  //       {
  //         id: resultEvent.id,
  //       },
  //       process.env.SCRT_TKN,
  //       {
  //         expiresIn: "1h",
  //       }
  //     );

  //     return res.status(200).send({
  //       message: "Event created successfully",
  //       token,
  //       event: resultEvent,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).send({
  //       message: "Error create event",
  //       error: err.message,
  //     });
  //   }
  // },
  // // getAllEvents: async (req, res) => {
  // //   try {
  // //     const events = await event_details.findAll();
  // //     res.status(200).send(events);
  // //   } catch (err) {
  // //     res.status(500).send(err);
  // //   }
  // // },
  // getEventById: async (req, res) => {
  //   try {
  //     const event = await event_details.findOne(req.params.id);
  //     res.status(200).send(event);
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
  // },
  // updateEvent: async (req, res) => {
  //   try {
  //     const event = await event_details.update(
  //       {
  //         name: req.body.name,
  //         idpromotor: req.body.idpromotor,
  //         startDate: req.body.startDate,
  //         endDate: req.body.endDate,
  //         startTime: req.body.startTime,
  //         endTime: req.body.endTime,
  //         location: req.body.location,
  //         city: req.body.city,
  //         idformat: req.body.idformat,
  //         idtopic: req.body.idtopic,
  //         idcategory: req.body.idcategory,
  //       },
  //       {
  //         where: {
  //           id: req.params.id,
  //         },
  //       }
  //     );
  //     res.status(200).send(event);
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
  // },
  // deleteEvent: async (req, res) => {
  //   try {
  //     const event = await event_details.destroy({
  //       where: {
  //         id: req.params.id,
  //       },
  //     });
  //     res.status(200).send(event);
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
  // },
};
