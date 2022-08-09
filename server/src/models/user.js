const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, {timestamps: true})

module.exports = module('User', userSchema)