const express = require('express');
const bodyParser = require ('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res)=>{
    const event = req.body;

    // client 4000
    axios.post('http://localhost:4000/events', event)
    // posts 4001
    axios.post('http://localhost:4001/events', event)
    // comments 4002
    axios.post('http://localhost:4002/events', event)

    res.send({status: "ok"});

});

app.listen(4005, ()=>{
console.log("listening on port from event-bus 4005...")
}
);