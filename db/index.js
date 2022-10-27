require("dotenv").config();

const mongoose = require("mongoose");

const conn = mongoose.connect(
  process.env.DATABASE_API, // process.env.HEROKU_STRING
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'wishlists' // might need to bring this back lolidk
  })
  .then(() => {console.log('database connected')})
  .catch(e => console.error("Database not connected: ", e));

const db = mongoose.connection;

module.exports = db;