const mongoose = require('mongoose');
const Schema = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: String,
    department: String,
    phoneNumber: String,
    dob: String
})
module.exports = studentSchema;
module.exports = mongoose.model(
    'studentlist', studentSchema, 'studentlist'); //Collection Name