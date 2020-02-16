const express = require('express');
const bodyParser = require('body-parser');
const db= require("./db.js");
const validator = require("./validate.js")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/test', (req, res) => {
  res.json({message: 'pass!'})
});

app.post('/query', (req, res) => {
  const body = req.body;
  const errors = validator.validate(body);
  if(errors.code !== 0) {
    res.status(400);
    res.json(createResponse(errors.code, errors.messages, []));
    return;
  }


  db.query(body.startDate, body.endDate, body.minCount, body.maxCount, function (result) {
    var response;
    if(result.errmsg) {
      res.status(400);
      response = createResponse(1, result.errmsg, []);
    } else {
      response = createResponse(0, "Success", result);
    }
    res.json(response);
  });
});

function createResponse(code, message, records) {
  return {"code":code, "msg": message, "records": records};
}

module.exports = app;
