const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: 'redis-11345.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: '11345'
    },
    username: '',
    password: 'T8HOkS2i3xgwarD7IYnpmoM2nqE6aSRo'
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