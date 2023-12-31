require("dotenv").config();
const PORT = process.env.PORT || 2000;
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const bearerToken = require("express-bearer-token")
app.use(bearerToken());

app.get("/", (req, res) => {
  return res.status(200).send("<h1>API RUNNING</h1>")
});

// Define Router
const {eventsRouter, topicsRouter, formatsRouter, citiesRouter, accountsRouter} = require("./routers");
app.use("/events", eventsRouter)
app.use("/topics", topicsRouter)
app.use("/formats", formatsRouter)
app.use("/cities", citiesRouter);
app.use("/accounts" , accountsRouter)


app.listen(PORT, () => {
  console.log(`API RUNNING ON PORT ${PORT}`);
});