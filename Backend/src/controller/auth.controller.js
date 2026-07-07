const userModel = require('../model/user.model')
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken');
const blacklistModel = require('../model/blacklist.model')
const redis = require('../config/cache')


async function registerController(req,res){
    const {username,email,password} = req.body

    const isAlreadyRegister = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    })
    if(isAlreadyRegister){
        return res.status(400).json({
            message: "user already register"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },  
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginController(req,res){
    const {email,password,username} = req.body
    

    const user = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(!user){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token);

    return res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function getMecontroller(req,res){
    const user = await userModel.findById(req.user.id)
    
    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function logoutController(req,res){
    
    const token = req.cookies.token;
    
    res.clearCookie("token")
    
    await redis.set(token, Date.now().toString())

    await blacklistModel.create({
        token
    })

    res.status(200).json({
        message: "user logged out successfully"
    })


}
module.exports = {
    registerController,
    loginController,
    getMecontroller,
    logoutController
}