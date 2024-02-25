// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const UsersSchema = new Schema({
//     userName: {
//         type: String,
//         required: true
//     },
//     accountId: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     citizenID: {
//         type: String,
//         required: true
//     },
//     balance: {
//         type: Number,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     token: {
//         type: String,
//         required: true
//     },
// });

// const TransferSchema = new Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Users',
//     },
//     toUser: {
//         type: String,
//         required: true
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     remain: {
//         type: Number,
//         required: true
//     },
//     timeStamp: {
//         type: Date,
//         default: Date.now
//     },
// });

// const ReceiveSchema = new Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Users',
//     },
//     fromUser: {
//         type: String,
//         required: true
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     remain: {
//         type: Number,
//         required: true
//     },
//     timeStamp: {
//         type: Date,
//         default: Date.now
//     },
// });

// const modelsArray = [
//     mongoose.model('Users', UsersSchema),
//     mongoose.model('Transfer', TransferSchema),
//     mongoose.model('Receive', ReceiveSchema)
// ];

// module.exports = modelsArray;
