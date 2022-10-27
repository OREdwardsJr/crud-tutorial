const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({ 
    destination: String,
    location: String,
    description: String 
});

module.exports = mongoose.model("Destinations", DestinationSchema); // what goes into the database, model