const express = require('express');
const router = express.Router();

const JsonSheme = require('../models/formModel');

router.get('/:keyWord', (req, resp) => {
  let formName = req.params.keyWord;

  JsonSheme.getShema(formName)
  .then((result) => {
    resp.status(200).json({message:result.fields});
  })
  .catch((err) => {resp.status(403).json({message:"No Such Form on the DataBase"})})

});

router.post('/', (req, resp) => {
  JsonSheme.addSchema(req.body)
  .then((schema) => {resp.status(200).json({message:schema})})
  .catch((err) => {resp.status(403).json({message:err.message})})

});

router.put('/:keyWord', (req,resp)=>{
  let formName = req.params.keyWord;
  let newSchema = req.body;
  JsonSheme.updateSchema(newSchema , formName)
  .then((result) => {resp.status(200).json({message:"schema has been updated",newValue:result})})
  .catch((err) => {resp.status(403).json({message:err.message})})
})


module.exports = router;
