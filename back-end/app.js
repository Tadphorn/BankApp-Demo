require('dotenv').config()

const cors = require("cors")
const express = require('express')
const mongoose = require('mongoose');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/', require('./routes/users'));
app.use('/', require('./routes/crud'));


app.listen(PORT, async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected');
    } catch (err) {
        console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);
});
