const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({ 
    username: { type: String }, // make this a requirement
    password: { type: String }, // make this a requirement
    destinations: [{ type: Schema.Types.ObjectId, ref: 'Destinations' }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Users", UserSchema);