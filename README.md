# getir Project

## Run Instructions
1. Clone https://github.com/gurgah/getir
2. Change into the code folder.
3. Install node if you don't have.
4. Run the command `node start`
5. You can see it in the http://localhost:8080
6. Sample POST is below:

    * Endpoint : http://localhost:8080/query
    * Body : `{
                 "startDate":"2017-01-01",
                 "endDate":"2017-01-02",
                 "minCount" : 900,
                 "maxCount": 1000
              }`
     * Sample Response: 
     `{
                             "code": 0,
                             "msg": "Success",
                             "records": [
                                 {
                                     "key": "WqgHAZqVR0Qayl5i",
                                     "createdAt": "2017-01-01T19:35:42.675Z",
                                     "totaCount": 900
                                 },
                                 {
                                     "key": "THaMB8yZBwiL2f2q",
                                     "createdAt": "2017-01-01T18:17:55.614Z",
                                     "totaCount": 900
                                 },
                                 {
                                     "key": "vwzobgfu35z3vcWX",
                                     "createdAt": "2017-01-01T10:08:15.332Z",
                                     "totaCount": 1000
                                 }
                             ]
                         }`
    
## About The Code

* The code is running with success. 
* Input validations are added.
    * Null check validation added. 
    * Date format enforcement : Only `YYYY-MM-DD` format is accepted.
    * Number validation added for `maxCount` and `minCount`.
        
## Testing

* Run `npm test` to see test results.
* Validator tests and endpoint tests are added. The tests can be enhanced for sure. 

## AWS Deployment

You can test the API here : [POST] `http://ec2-18-220-72-176.us-east-2.compute.amazonaws.com:8080/query`

## Future Work

* Security layer can be added for the requests.
* Username and passwords should not be pushed to the repo. Environment variables for secrets can be defined.
* Load balancer can be added for scaling and high availability purposes.

