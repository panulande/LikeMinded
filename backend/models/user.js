const mongoose =  require('mongoose');

const { Schema } = require('mongoose');
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    usersName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileUrl: {
        type: String,
        required: false,
    },
    dateCreated: {
        type: Date,
        required: true,
    },


})

module.exports = mongoose.model('User', userSchema);