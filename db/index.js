require("dotenv").config();

const mongoose = require("mongoose");
const conn = mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://https://vacation-wishlist.herokuapp.com//wishlist',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'wishlists'
  })
  .then(() => {console.log('database connected')})
  .catch(e => console.error("Database not connected: ", e));

const db = mongoose.connection;

module.exports = db;