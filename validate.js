function validate (body) {
  var errorBody = {code: 0};
  var messages = "";
  if (!body) {
    errorBody.msg = "Invalid request";
    return errorBody;
  }
  if (!body.startDate) {
    messages = messages + "startDate must not be null. ";
  } else if (!validateDate(body.startDate)) {
    messages = messages
        + "startDate must be in proper date format => YYYY-MM-DD. ";
  }
  if (!body.endDate) {
    messages = messages + "endDate must not be null. ";
  } else if (!validateDate(body.endDate)) {
    messages = messages
        + "endDate must be in proper date format => YYYY-MM-DD. ";
  }
  if (body.minCount == null) {
    messages = messages + "minCount must not be null. ";
  } else if (!validateNumber(body.minCount)) {
    messages = messages + "minCount must be a number. ";
  }
  if (body.maxCount == null) {
    messages = messages + "maxCount must not be null. ";
  } else if (!validateNumber(body.maxCount)) {
    messages = messages + "maxCount must be a number. ";
  }
  if (messages.length > 0) {
    errorBody.code = 2;
    errorBody.messages = messages;
  }
  return errorBody;

}
function validateDate(date) {
  const regex = "^(19[5-9][0-9]|20[0-4][0-9]|2050)[-](0[1-9]|1[0-2])[-](0[1-9]|[12][0-9]|3[01])$";
  const patt = new RegExp(regex);
  return patt.test(date);
}

function validateNumber (number) {
  return typeof number === "number"
}
module.exports = {
  validate, validateNumber, validateDate
};
