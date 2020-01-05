const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let categorySchema = new Schema({
       categoryName: String,
       parentId: {
              type: String,
              default: ""
       },
       type: Number,  //1- Offline  ,  2- Online
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

module.exports = {
       category: mongoose.model('Category', categorySchema)
}