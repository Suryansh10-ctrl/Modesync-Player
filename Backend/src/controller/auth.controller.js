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

    const cookieOptions = {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    }

    res.cookie("token", token, cookieOptions)

    res.status(201).json({
        message: "user registered successfully",
        token,
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

    const cookieOptions = {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    }

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
        message: "user logged in successfully",
        token,
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
    const token = req.cookies?.token;

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
    })

    if (token) {
        try {
            await redis.set(token, Date.now().toString())
            await blacklistModel.create({ token })
        } catch (error) {
            console.error("Logout blacklist error:", error)
        }
    }

    return res.status(200).json({
        message: "user logged out successfully"
    })
}
module.exports = {
    registerController,
    loginController,
    getMecontroller,
    logoutController
}