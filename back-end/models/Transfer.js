const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TransferSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    toUser: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    remain: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Transfer', TransferSchema);