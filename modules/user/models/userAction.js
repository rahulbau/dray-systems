const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
       userId: Schema.Types.ObjectId,
       feedback : String,
       createdAt: { type: Date, default: Date.now }
});


const supportSchema = new Schema({
       userId: Schema.Types.ObjectId,
       supportMessage : String,
       type : Number,
       status : {
              type : Number,
              default : 1
       },
       createdAt: { type: Date, default: Date.now }
});

module.exports = {
       feedback :  mongoose.model('Feedback', feedbackSchema),
       support :  mongoose.model('SupportRequest', supportSchema)
}