require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 2000;
app.use(cors());
app.use(express.json());


// const {eventsRouter} = require("./routers")

const {eventsRouter,bannersRouter} = require("./routers")
app.use("/events", eventsRouter);
app.use("/banners", bannersRouter);

app.listen(port, () => {});
console.log(`Server running on port ${port}`);

