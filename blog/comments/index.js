const express = require("express");
const bodyparser = require('body-parser');
const { randomBytes } = require("crypto");
const cors = require('cors');

const app = express();
app.use(bodyparser.json());
app.use(cors());

const commentsByPostId = {};

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body; // ✅ fix: extract content string

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments); // ✅ fix: return comment list or new comment
});

app.listen(4001, () => {
  console.log("listening on 4001....");
});
