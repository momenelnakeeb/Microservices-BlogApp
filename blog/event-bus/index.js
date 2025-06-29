const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  // the newst is the last one
  events.push(event);
  // client 4000
 axios.post("http://localhost:4000/events", event).catch((err) => {
  console.log("Error sending to 4000:", err.message);
});
axios.post("http://localhost:4001/events", event).catch((err) => {
  console.log("Error sending to 4001:", err.message);
});
axios.post("http://localhost:4002/events", event).catch((err) => {
  console.log("Error sending to 4002:", err.message);
});
axios.post("http://localhost:4003/events", event).catch((err) => {
  console.log("Error sending to 4003:", err.message);
});

  res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.send(events);
});
app.listen(4005, () => {
  console.log("listening on port from event-bus 4005...");
});
