const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true,
        unique: true
    },
    citizenID: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
});



module.exports = mongoose.model('Users', UsersSchema);
