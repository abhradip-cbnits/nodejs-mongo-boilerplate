const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
 });



exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

 // Export the model
module.exports = mongoose.model('User', UserSchema);