const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: '',
        port: ''
    },
    username: '',
    password: ''
});

(async () => {
    await client.connect();
})();
  
console.log("Connecting to the Redis");
  
client.on("ready", () => {
    console.log("Connected Redis!");
});
  
client.on("error", (err) => {
    console.log("Error in the Connection");
});
  
module.exports = client;
