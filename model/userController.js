const mongoose = require('mongoose')
const userShema = mongoose.Schema(
    {
        First_Name: {
            type: String,
            require: true
        },
        Last_Name: {
            type: String,
            require: true
        },
        Middle_Name: {
            type: String,
            require: false
        },
        Email: {
            type: String,
            require: true
        },
        Mobile_No: {
            type: Number,
            require: true
        },
        Date_of_Birth: {
            type: String,
            require: true
        },
        Gender: {
            type: String,
            require: true
        },
        Password: {
            type: String,
            require: true
        },
        Image: {
            type: String,
            require: true
        },
        Verfied: {
            type: Boolean,
            require: false
        },
        Work_space:{
            type: String,
            require: true
        },
        study:{
            type: String,
            require: true
        },
        Address:{
            type: String,
            require: true
        }

    },
    {
        timestamp: true
    }
)
const user = mongoose.model('user', userShema)
module.exports = user