const jwt = require("jsonwebtoken");
const db = require("../models");
const fs = require("fs");
const bycrypt = require("bcrypt");
const {
  event_details,
  event_format,
  event_topic,
  ticket,
} = require("../models/index");

module.exports  = {
  createEvent : async (req, res) => {
    try{
      const event = await event_details.create({
        name: req.body.name,
        idpromotor: req.body.idpromotor,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        location: req.body.location,
        city: req.body.city,
      });
      if(!req.file || !req.file.filename){
        return res.status(400).send({
          message: "No file uploaded"
        });
      }
      const file = req.file.filename;
      const ext = file.split('.').pop();
      const fileName = `${Date.now()}.${ext}`;
      fs.renameSync(req.file.path, `${__dirname}/../public/uploads/${fileName}`);

        const event_format = await event_format.create({
        idformat: req.body.idformat,
        idevent: event.id
      });
      const event_topic = await event_topic.create({
        idtopic: req.body.idtopic,
        idevent: event.id
      });
      const ticket = await ticket.create({
        idticket: req.body.idticket,
        idevent: event.id
      });
      const token = jwt.sign({
        id: event.id
      }, process.env.SECRET, {
        expiresIn: "1h"
      });
     return res.status(200).send({
        message: "Event created successfully",
        token: token,
        event: event
      });
    }catch (err){
      return res.status(500).send(err);
    }
  },
  getAllEvents : async (req, res) => {
    try{
      const events = await event_details.findAll();
      res.status(200).send(events);
    }catch (err){
      res.status(500).send(err);
    }
  },
  getEventById : async (req, res) => {
    try{
      const event = await event_details.findOne(req.params.id);
      res.status(200).send(event);
    }catch (err){
      res.status(500).send(err);
    }
  },
  updateEvent : async (req, res) => {
    try{
      const event = await event_details.update({
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
      }, {
        where: {
          id: req.params.id
        }
      });
      res.status(200).send(event);
    }catch (err){
      res.status(500).send(err);
    }
  },
  deleteEvent : async (req, res) => {
    try{
      const event = await event_details.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).send(event);
    }catch (err){
      res.status(500).send(err);
    }
  },
};
