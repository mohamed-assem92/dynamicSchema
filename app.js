const sendError = require('./middleWares/catchErrors');
const headers = require('./middleWares/headers');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const jsonParser = bodyParser.json();
const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();

mongoose.connect("mongodb://localhost:27017/Fixed");

const formRouter = require("./controllers/form");
const submitRouter = require("./controllers/submit");

fs.readdirSync(path.join(__dirname,"models")).forEach(function(filename){
    require('./models/'+filename);
});

app.use(headers);
app.use(jsonParser);

app.use('/form', formRouter);
app.use('/submit', submitRouter);

app.use(sendError);

app.listen(9090 , () => {
  console.log("app is running on port 9090");
});
