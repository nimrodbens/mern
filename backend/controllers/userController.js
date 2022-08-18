const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// @desc    register user
// @route   POST /api/users
// @access  PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add all fields')
    }

    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error("user already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201)
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error("invalid user data")
    }
})

// @desc    authenticate user
// @route   POST /api/users/login
// @access  PUBLIC
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('please add all fields')
    }

    const user = await User.findOne({email})
    console.log({password});
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })   
    } else {
        res.status(400)
        throw new Error("wrong credentials")
    }
})

// @desc    get user data
// @route   GET /api/users/me
// @access  PRIVATE
const getMe = asyncHandler(async (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    })
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        // expiresIn: '365d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}