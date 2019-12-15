const mongoose = require('mongoose')
const { logger } = require('../util');

let db = mongoose.connect(process.env.MONGO_URL, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true}, function (err) {

if (err) throw err;  
console.log('Successfully connected with mongoDB');

});
module.exports = {
    db
};
