const express = require('express');
const app = express();
require('./models/connection');
const userRoute = require("./routes/user")
const postRoute = require("./routes/post")
const PORT = 5000;
app.use(express.json());
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)
require('./redisConnection');

app.get("/", (req, res) => {
    res.send("Welcome to app");
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
});

