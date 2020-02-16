
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

const validationError = 2;
const badRequest = 400;
const okResponse = 200;
const success = 0;
const emptyMessage = 'startDate must not be null. endDate must not be null.'
    + ' minCount must not be null. maxCount must not be null. ';
const invalidStartDateMessage= 'startDate must be in proper date format => YYYY-MM-DD. ';
const invalidEndDateMessage= 'endDate must be in proper date format => YYYY-MM-DD. ';

it('should return validation error when null fields', async done => {
  const response = await request.post('/query')

  expect(response.status).toBe(badRequest)
  expect(response.body.code).toBe(validationError)
  expect(response.body.msg).toBe(emptyMessage)
  done()
});

it('should return validation error when invalid start date', async done => {
  let invalidDate = {
    "startDate":"01-01-2017",
    "endDate":"2020-01-31",
    "minCount" : 123,
    "maxCount":1000
  };
  const response = await request.post('/query').send(invalidDate);
  expect(response.status).toBe(badRequest);
  expect(response.body.code).toBe(validationError);
  expect(response.body.msg).toBe(invalidStartDateMessage);
  done()
});

it('should return validation error when invalid end date', async done =>  {
  let invalidEndDate = {
    "endDate":"01-01-2017",
    "startDate":"2020-01-31",
    "minCount" : 123,
    "maxCount":1000
  };
  const response = await request.post('/query').send(invalidEndDate);
  expect(response.status).toBe(badRequest);
  expect(response.body.code).toBe(validationError);
  expect(response.body.msg).toBe(invalidEndDateMessage);
  done()
});

it('should return validation error when non-number minCount', async done => {
  let invalidMinCount = {
    "startDate":"2020-01-31",
    "endDate":"2020-01-31",
    "minCount" : "invalid",
    "maxCount":1000
  };
  const response = await request.post('/query').send(invalidMinCount);
  expect(response.status).toBe(badRequest);
  expect(response.body.code).toBe(validationError);
  done()
});

it('should return validation error when non-number maxCount', async done => {
  let invalidMinCount = {
    "startDate":"2020-01-31",
    "endDate":"2020-01-31",
    "minCount" : 1000,
    "maxCount":"invalid"
  };
  const response = await request.post('/query').send(invalidMinCount);
  const validationError = 2;
  expect(response.status).toBe(badRequest);
  expect(response.body.code).toBe(validationError);
  done()
});

it('should return success', async done => {
  let invalidMinCount = {
    "startDate":"2017-01-31",
    "endDate":"2020-01-31",
    "minCount" : 1400,
    "maxCount": 1500
  };
  const response = await request.post('/query').send(invalidMinCount);
  expect(response.status).toBe(okResponse);
  expect(response.body.code).toBe(success);
  done()
});

afterAll(() => {
  global.gc && global.gc()
})
