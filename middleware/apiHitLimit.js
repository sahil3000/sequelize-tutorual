const client = require("../redisConnection")

const apiHitLimit = async (req, res, next) => {
    // get client ip address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress  || req.connection.remoteAddress
    
    const request = await client.incr(ip);
    if (request === 1) {
        await client.expire(ip, 60)
        // expire after 60 second
    }
    console.log("You hit count is " + request)
    if (request > 10) {
        return res.status(403).json({
            error: true,
            body: [],
            apiHitCount: request,
            msg: 'Limit exceed. Api hit limit 10 times in a minute'
        });
    } else {
        req.request = request;
        next();
    }

}
module.exports =  {apiHitLimit};