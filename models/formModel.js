const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jsonSchema = new Schema({
  sch:{
    id:{
      type:String,
      required:true,
      unique:true
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
  },
  fields:[{
    _id:false,
    type:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    class:{
      type:String,
    },
    html:{
      type:String,
      required:true
    },
    required:{
      type:Boolean
    },
    placeholder:{
      type:String
    },
    value:{
      type:String
    }
  }]
});


jsonSchema.statics.addSchema = function (obj) {

  let result = splitObject(obj);
    const newShema = new JsonSheme({
      sch:{
        id:result.obj.id,
        properties:result.obj.properties,
        type:result.obj.type,
        required:result.obj.required
      },
      fields:result.fieldsArray
    })
    return newShema.save()
};

jsonSchema.statics.getShema = function (schemaName) {

  return JsonSheme.findOne({ "sch.id":schemaName });

};

jsonSchema.statics.updateSchema = function (newSchema , schemaName) {

  let result = splitObject(newSchema);
  return JsonSheme.updateOne({ "sch.id":schemaName }, { $set: { sch: result.obj , fields: result.fieldsArray }});
}



const JsonSheme = mongoose.model("schema", jsonSchema);

module.exports = JsonSheme;

const splitObject = function (obj) {
  let fieldsArray = [];
  let requiredArr = obj.required;
  let fields = Object.keys(obj.properties);
  let properties = obj.properties;

  for (let key of fields) {

      if (properties[key].hasOwnProperty("field")) {
        if (requiredArr.includes(key)) {
          properties[key].field["required"] = true;
          fieldsArray.push(properties[key].field)
          delete properties[key].field
        }
        else {
          fieldsArray.push(properties[key].field)
          delete properties[key].field
        }
      }
  }
  return {fieldsArray , obj};
}
