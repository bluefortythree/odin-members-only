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
        res.status(StatusCodes.CREATED).cookie('token', token).json({user: {name: user.email, membership: user.membership}, token})
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
    res.status(StatusCodes.OK).cookie('token', token).json({user: {name: user.email, membership: user.membership}, token})
    console.log(user)
}

const logout = (req, res) => {
    const loggedIn = req.headers.cookie
    if(!loggedIn) {
        throw new Error('You are already logged out!')
    } else {
        return res.clearCookie('token').status(200).json({message: 'Logged out'})
    }
}

const membership = async(req, res, next) => {
    const loggedIn = req.headers.cookie
    if(!loggedIn) {
        throw new Error('You do not have permission to access this page.')
    }

    const token = req.headers.cookie.split('token=')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId
    const user = await User.findOne({_id: userId})
    const isMember = user.membership
    const {membership} = req.body
    if(isMember !== 'member' && membership === 'fester') {
        const currentUser = await User.findOneAndUpdate({_id: userId}, {membership: 'member'}, {new: true})
        console.log(userId, currentUser.email, currentUser.membership)
        res.redirect('/home')
    } else if(isMember === 'member' && membership === 'fester') {
        // throw new Error('You are already a member! Taking you to the home page...')
        res.status(StatusCodes.BAD_REQUEST).json({message: 'You are already a member!'})
    } else if(isMember !== 'admin' && membership === 'asdfasdf') {
        const currentUser = await User.findOneAndUpdate({_id: userId}, {membership: 'admin'}, {new: true})
        console.log(userId, currentUser.email, currentUser.membership)
        res.redirect('/home')
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({message: 'Incorrect passcode. Please try again.'})
    }
}

module.exports = {register, login, logout, membership}