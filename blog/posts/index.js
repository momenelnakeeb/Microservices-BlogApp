const express = require("express");
const bodyparser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyparser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body; //  Destructure properly with the curly braces

  posts[id] = {
    id,
    title, // Now this is a string
  };

  // adding the event-bus
  try {
    await axios.post("http://localhost:4005/events", {
      type: "postCreated",
      data: { id, title },
    });
  } catch (err) {
    console.error("Failed to emit event to event bus:", err.message);
  }

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("listening on 4000....");
});
