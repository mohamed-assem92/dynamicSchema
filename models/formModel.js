const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jsonSchema = new Schema({
  sch:{
    id:{
      type:String,
      required:true
    },
    properties:{
      type:Object,
      required:true
    },
    type:{
      type:String,
      required:true
    },
    required:[]
  }
});


jsonSchema.statics.addSchema = function (obj) {

  const newShema = new JsonSheme({
    sch:{
      id:obj.id,
      properties:obj.properties,
      type:obj.type,
      required:obj.required
    }
  })
    return newShema.save()
};

jsonSchema.statics.getShema = function (schemaName) {

  return JsonSheme.findOne({ "sch.id":schemaName });

};

jsonSchema.statics.updateSchema = function (newSchema , schemaName) {
  return JsonSheme.updateOne({ "sch.id":schemaName }, { $set: { sch: newSchema }});
}



const JsonSheme = mongoose.model("schema", jsonSchema);

module.exports = JsonSheme;
