const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')

const register = async(req, res) => {
    if(req.body.password !== req.body.confirm) {
        res.status(StatusCodes.UNAUTHORIZED).send('Passwords do not match')
    }
    else {
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({user: {name: user.email}, token})
        console.log(user)    
    }
}

const login = async(req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        // res.status(StatusCodes.BAD_REQUEST).send('Please provide email and password')
        throw new Error('Please provide email and password')
    }
    const user = await User.findOne({email})
    if(!user) {
        // res.status(StatusCodes.UNAUTHORIZED).send('Username or password is incorrect')
        throw new Error('Username or password is incorrect')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        // res.status(StatusCodes.UNAUTHORIZED).send('Username or password is incorrect')
        throw new Error('Incorrect password')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).cookie('token', token).json({user: {name: user.email}, token})
}

module.exports = {register, login}