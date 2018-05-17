const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const submitSchema = new Schema({},{strict:false});

const Collection = mongoose.model("collection" , submitSchema);

module.exports = Collection;
