const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "postCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "commentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content }); // ✅ correct
    // You're pushing two separate values (id and content) directly into the comments array, which leads to an array like this:
    // comments: ["c1", "Great post!", "c2", "Thanks!"]
    // This is not an array of comment objects, which is what your React component is expecting.
    // post.comments.push(id, content);
  }

  console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log("listening from query on 4002...");
});
