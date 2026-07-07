const userModel = require('../model/user.model')
const jwt =  require('jsonwebtoken');
const redis = require('../config/cache')


async function authUser(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const isTokenBlacklisted = await redis.get(token);


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