const mongoose = require('mongoose')
const {Schema} = mongoose
const SessionSchema = new Schema({
    duration : { type : Number, default: 0 },
    completedAt :{type : Date , default : Date.now},
});
module.exports = mongoose.model('Sessions',SessionSchema)
