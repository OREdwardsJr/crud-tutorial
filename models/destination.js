const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({ 
    title: String,
    location: String,
    imageUrl: String,
    description: String 
});

module.exports = mongoose.model("Destination", DestinationSchema); // what goes into the database, model