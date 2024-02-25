const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


router.get('/getUser', auth, async (req, res) => {
    try {
        console.log("user-----", req.user.userId);
        const userId = req.user.userId;
        const user = await User.findById(userId);
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
})

router.post('/register', async (req, res) => {
    try {
        const { citizenID, userName, accountId, balance, password } = req.body;
        if (!(citizenID && password && userName && accountId && balance)) {
            return res.status(400).json({ message: "All input is required" });
        }
        //encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            citizenID: citizenID,
            userName: userName,
            accountId: accountId,
            balance: balance,
            password: encryptedPassword,
            token: ""
        });
        //create token
        const token = jwt.sign({ user_id: user._id, citizenID }, process.env.TOKEN_KEY, { expiresIn: '2h' });
        //save token
        user.token = token;

        await user.save();
        res.status(200).json({ user })
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { citizenID, password } = req.body;
        if (!(citizenID && password)) {
            return res.status(400).json({ message: "All input is required" });
        }
        const user = await User.findOne({ citizenID });
        //can't find account
        if (!user) {
            return res.status(400).json({ message: "Account dosn't Exist" });
        }
        console.log("user-----", user)
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user._id, citizenID }, process.env.TOKEN_KEY, { expiresIn: '2h' });
            user.token = token;
            await user.save();

            return res.status(200).json({ user: user });
        }
        return res.status(400).json({ message: "Account or Password is Wrong" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});


router.get('/logout', auth, async (req, res) => {
    try {
        console.log("user-----", req.user.userId);
        const userId = req.user.userId;
        const user = await User.updateOne({ _id: userId }, { $unset: { token: 1 } });

        res.status(200).json({ massage: "logout success", user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
})


module.exports = router;