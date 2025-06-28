const express = require("express");
const bodyparser = require('body-parser');
const { randomBytes } = require("crypto");
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyparser.json());
app.use(cors());

const commentsByPostId = {};

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment
app.post('/posts/:id/comments', async(req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body; // ✅ fix: extract content string

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post( 'http://localhost:4005/events',{
    type: 'commentCreated',
   data:{
    id: commentId,
    content,
    postId: req.params.id

   } 
  } );

  res.status(201).send(comments); // ✅ fix: return comment list or new comment
});


app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type);

  res.send({});
});


app.listen(4001, () => {
  console.log("listening on 4001....");
});
