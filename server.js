const express = require('express');
const app = express();
require('./models/connection');
const userRoute = require("./routes/user")
const PORT = 5000;
app.use(express.json());
app.use('/api/user',userRoute)
require('./redisConnection');

app.get("/", (req, res) => {
    res.send("Welcome to app");
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
});

