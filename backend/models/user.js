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
    }  
    ,
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('User', userSchema);