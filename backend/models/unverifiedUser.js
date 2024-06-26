const mongoose =  require('mongoose');

const { Schema } = require('mongoose');
const unverifiedUserSchema = new Schema({
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
    verifiedEmail: {
        type: Boolean,
        required: true
    },
    emailVerificationToken: String,
    emailVerificationTokenExpiration: Date,

})

module.exports = mongoose.model('unverifiedUser', unverifiedUserSchema);