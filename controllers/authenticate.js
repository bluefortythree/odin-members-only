const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

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
        res.status(StatusCodes.BAD_REQUEST).send('Please provide email and password')
    }
    const user = await User.findOne({email})
    if(!user) {
        res.status(StatusCodes.UNAUTHORIZED).send('Username or password is incorrect')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        res.status(StatusCodes.UNAUTHORIZED).send('Username or password is incorrect')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.email}, token})
    console.log('hello')
}

const homepage = async(req, res) => {
    res.status(200).json({msg: `Hello, ${req.user.firstname}`})
}

module.exports = {register, login, homepage}