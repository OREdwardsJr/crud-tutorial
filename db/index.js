const mongoose = require("mongoose");
require("dotenv").config();

// mongoose.connect(process.env.DATABASE, {
//     useUnifiedTopology: true,
//     dbName: 'wishlists'
// }).then(() => console.log("Database connected"))
// .catch(e => console.error("Database not connected: ", e));

mongoose.connect(
    process.env.MONGODB_URI, //|| 'mongodb://https://vacation-wishlist.herokuapp.com//wishlist', // changed from 27017
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'wishlists'
    }).then(() => console.log('database connected'))
    .catch(e => console.error("Database not connected: ", e));

const db = mongoose.connection;

module.exports = db;