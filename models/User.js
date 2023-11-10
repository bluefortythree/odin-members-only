const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, 'First name is required'],
        minlength: 1,
        maxlength: 50,
    },
    lastName: {
        type: String, 
        required: [true, 'Last name is required'],
        minLength: 1,
        maxLength: 50,
    },
    email: {
        type: String, 
        required: [true, 'Email address is required'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'
        ],
        unique: true,
    },
    password: {
        type: String, 
        required: [true, 'Password is required'],
        minLength: 6,
    },
    membership: {
        type: String, 
        enum: ['user', 'member', 'admin'],
        default: 'user',
    }
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, email: this.email}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

UserSchema.methods.comparePassword = async function(canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)