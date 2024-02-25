require('dotenv').config()

const cors = require("cors")
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/', require('./routes/users'));
app.use('/', require('./routes/crud'));


const mongoURI = 'mongodb://localhost:27017/BankApp'
const options = {
    readPreference: 'secondary',
};



app.listen(PORT, async () => {
    try {
        // mongoose.createConnection(mongoURI);
        await mongoose.connect(mongoURI, options);
        console.log('Database connected');
    } catch (err) {
        console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);
});