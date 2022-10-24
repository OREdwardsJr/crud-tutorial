const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    dbName: 'wishlists'
}).then(() => console.log("Database connected"))
.catch(e => console.error("Database not connected: ", e));

// mongoose.connect(
//     process.env.MONGODB_URI || 'mongodb://localhost:27017/wishlist',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       dbName: 'wishlists'
//     }).then(() => console.log('database connected'))
//     .catch(e => console.error("Database not connected: ", e));

const db = mongoose.connection;

module.exports = db;