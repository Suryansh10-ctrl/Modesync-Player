const userModel = require('../model/user.model')
const jwt =  require('jsonwebtoken');
const redis = require('../config/cache')


async function authUser(req,res,next){
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    let isTokenBlacklisted = false;

    try {
        isTokenBlacklisted = Boolean(await redis.get(token));
    } catch (error) {
        console.error("Redis auth check failed:", error);
    }

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }


    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET
        )
        req.user = decoded
        next()

    }catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = authUser;