const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");
const bycrypt = require("bcrypt");
const util = require('util');

const {
  event_details,
  event_format,
  event_topic,
  ticket,
} = require("../models");
const uploader = require("../helper/uploader");
const banners = require("./banners");

module.exports = {
  createEvent: async (req, res, next) => {
    try {
      const {
        eventName,
        startDate,
        endDate,
        startTime,
        endTime,
        eventLocation,
        eventCity,
        paidTickets,
        freeTickets,
        eventFormat,
        eventTopic,
      } = req.body;

      // Handle image upload
      // console.log("TESTTTTT UPLOADERR",uploader);
      // const upload = uploader("/events").single("fileupload");
      // upload(req, res, async (err) => {
      //   if (err) {
      //     return res.status(500).send({
      //       message: "Upload image failed",
      //       error: err.message,
      //     });
      //   }
      // });

      // Handle image upload
      // console.log("TESTTTTT UPLOADERR", uploader);
      // const upload = util.promisify(uploader("/events").single("fileupload"));
      // try {
      //   await upload(req, res);
      // } catch (err) {
      //   return res.status(500).send({
      //     message: "Upload image failed",
      //     error: err.message,
      //   });
      // }

      const resultFormat = await event_format.create({
        format: eventFormat,
      });
      const idformat = resultFormat.id;

      const resultTopic = await event_topic.create({
        topic: eventTopic,
      });
      const idtopic = resultTopic.id;

      const resultEvent = await event_details.create({
        name: eventName,
        startDate,
        endDate,
        startTime,
        endTime,
        location: eventLocation,
        city: eventCity,
        idformat,
        idtopic,
        idcategory: 1,
      });

      const idevent = resultEvent.id;

      if (paidTickets && paidTickets.length > 0) {
        for (const ticketo of paidTickets) {
          await ticket.create({
            name: ticketo.name,
            qty: ticketo.qty,
            price: ticketo.price,
            type: "paid",
            idevent,
          });
        }
      }

      if (freeTickets && freeTickets.length > 0) {
        for (const ticketo of freeTickets) {
          await ticket.create({
            name: ticketo.name,
            qty: ticketo.qty,
            type: "free",
            idevent,
          });
        }
      }

      // Create banners if available
      if (req.file) {
        const result = await banners.create({
          filename: req.file.filename,
          path: req.file.path,
          idevent: resultEvent.id,
        });
      }

      const token = jwt.sign(
        {
          id: resultEvent.id,
        },
        process.env.SCRT_TKN,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).send({
        message: "Event created successfully",
        token,
        event: resultEvent,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: "Error create event",
        error: err.message,
      });
    }
  },
  getAllEvents: async (req, res) => {
    try {
      const events = await event_details.findAll();
      res.status(200).send(events);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getEventById: async (req, res) => {
    try {
      const event = await event_details.findOne(req.params.id);
      res.status(200).send(event);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateEvent: async (req, res) => {
    try {
      const event = await event_details.update(
        {
          name: req.body.name,
          idpromotor: req.body.idpromotor,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          location: req.body.location,
          city: req.body.city,
          idformat: req.body.idformat,
          idtopic: req.body.idtopic,
          idcategory: req.body.idcategory,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send(event);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const event = await event_details.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(event);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
