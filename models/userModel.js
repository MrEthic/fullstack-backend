const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fbId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
});

module.exports = mongoose.model('User', userSchema);