const mongoose  = require('mongoose');
const{ Schema} =mongoose;
const NotesSchema = new Schema({
    title: {type: String,required : true},
    content:{type : String,default:''},
    createdAt:{type: Date,default: Date.now},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
module.exports = mongoose.model('Notes',NotesSchema)