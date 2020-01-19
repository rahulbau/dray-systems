const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let categorySchema = new Schema({
       categoryName: String,
       parentId: {
              type: String,
              default: ""
       },
       type: Number,  //1- Offline  ,  2- Online
       metaData : Object,
       images : [String],
       hasChild : {
              type: Number,
              default: 1
       },
       location: {
              type: { type: String },
              coordinates: []
             },
       createdAt: {
              type: Date,
              default: Date.now
       }

});

categorySchema.index({ "location": "2dsphere" });
categorySchema.index({categoryName: 'text', 'metaData.name': 'text'});
module.exports = {
       category: mongoose.model('Category', categorySchema)
}