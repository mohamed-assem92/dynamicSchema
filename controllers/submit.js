const express = require('express');
const router = express.Router();

const Validator = require('jsonschema').Validator;
const v = new Validator();

const dynamicSchema = require('../models/submitModel');
const JsonSheme = require('../models/formModel');

router.post('/:keyWord', (req , resp) => {

  let instance = req.body;
  let formName = req.params.keyWord;
  let errorMessages = ["Record Not Saved"];

  JsonSheme.getShema(formName)
  .then((result) => {
    if (result) {
      // console.log();
      let schema = result.sch;
      let schemaResult = v.validate(instance, schema).valid;

      if (schemaResult) {
        
        let bodyRecord = {}

        for (const key of Object.keys(result.sch.properties)) {
            if (instance.hasOwnProperty(key)) {
              bodyRecord[key] = instance[key];
            }
        }

        let newRecord = new dynamicSchema(bodyRecord);
        return newRecord.save();

      }
      else {

        errorMessages = [];
        schemaResult.errors.map((err) => {
          errorMessages.push(err.message);
        })
        return Promise.reject(errorMessages);

      }
    }
    else {

      resp.status(404).json({message:"No Such schema"});

    }

  })
  .then((result) => {resp.status(200).json({message:"Record Inserted",record:result})})
  .catch(err => resp.status(400).json({message:errorMessages}))


})

module.exports = router;
