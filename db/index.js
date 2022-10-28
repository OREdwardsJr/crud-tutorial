require("dotenv").config();

const mongoose = require("mongoose");

const conn = mongoose.connect(
   process.env.HEROKU_STRING, // process.env.DATABASE_API,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'wishlists' // might need to bring this back lolidk
  })
  .then(() => {console.log('database connected')})
  .catch(e => console.error("Database not connected: ", e));

const db = mongoose.connection;

module.exports = db;