const mongoose = require('mongoose');

// const connectDB = async () => {

//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URI);
//         console.log(`Database Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log(error);
//     }

// }

// module.exports = connectDB;

mongoose.connect(process.env.MONGODB_URI)

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = conn;

