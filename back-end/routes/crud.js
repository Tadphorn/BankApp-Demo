const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
//model
const User = require('../models/Users');
const Receive = require('../models/Receive');
const Transfer = require('../models/Transfer');




router.get('/hi', auth, async (req, res) => {

    try {
        res.json({ message: req.user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// test connection
router.post('/deposit', auth, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user.userId);
        // Update balance field
        user.balance += amount;
        await user.save();

        // throw new Error("Test Error");
        //save history
        const deposit = new Receive({
            userId: user._id,
            fromUser: "Me",
            amount: amount,
            remain: user.balance
        });
        await deposit.save();
        // Commit the changes
        await session.commitTransaction();
        return res.status(200).json({ message: `Deposit ${amount} bath`, balance: user.balance })

    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        return res.status(400).json({ message: err.message });
    } finally {
        session.endSession();
    }
});




router.post('/withdraw', auth, async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user.userId);
        // Update balance field
        user.balance -= amount;
        await user.save();

        //save history
        const transfer = new Transfer({
            userId: user._id,
            toUser: "Me",
            amount: amount,
            remain: user.balance
        });
        await transfer.save();
        return res.status(200).json({ message: `widthdraw ${amount} bath`, balance: user.balance })

    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
})

router.post('/transfer', auth, async (req, res) => {
    try {
        const { toAccount, amount } = req.body;
        //widthdraw from user
        const user = await User.findById(req.user.userId);
        user.balance -= amount;
        await user.save();

        //deposit to target user
        const toUser = await User.findOne({ accountId: toAccount });
        if (!toUser) {
            return res.status(400).json({ message: "Account not found" });
        }
        toUser.balance += amount;
        await toUser.save();

        //save to target account receive history
        const receive = new Receive({
            userId: toUser._id,
            fromUser: user.userName,
            amount: amount,
            remain: toUser.balance
        });
        await receive.save();

        //save to my transfer history
        const transfer = new Transfer({
            userId: user._id,
            toUser: toUser.userName,
            amount: amount,
            remain: user.balance
        });
        await transfer.save();

        return res.status(200).json({ message: `Transfer ${amount} bath to ${toUser.userName}`, balance: user.balance, toUser });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }

})

//for History Page
router.get('/receive', auth, async (req, res) => {
    try {
        const userId = req.user.userId
        const receive = await Receive.find({ userId: userId });
        return res.status(200).json(receive);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
});

router.get('/transfer', auth, async (req, res) => {
    try {
        const userId = req.user.userId
        const transfer = await Transfer.find({ userId: userId });
        return res.status(200).json(transfer);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
});




module.exports = router;