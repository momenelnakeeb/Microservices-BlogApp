const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require ('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "postCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  // for the comments we need to add the logic of moderation (status flag)
  if (type === "commentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status }); // ✅ correct
    // You're pushing two separate values (id and content) directly into the comments array, which leads to an array like this:
    // comments: ["c1", "Great post!", "c2", "Thanks!"]
    // This is not an array of comment objects, which is what your React component is expecting.
    // post.comments.push(id, content);
  }

  if (type === "commentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    if (!post) {
      console.warn(`Post with ID ${postId} not found`);
      return res.send({});
    }

    const comment = post.comments.find((comment) => comment.id === id);

    if (comment) {
      comment.status = status;
      comment.content = content;
    } else {
      console.warn(`Comment with ID ${id} not found in post ${postId}`);
    }
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  try {
    const res = await axios.get("http://localhost:4005/events");

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
