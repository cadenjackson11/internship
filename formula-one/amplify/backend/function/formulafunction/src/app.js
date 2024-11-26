
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const axios = require('axios');


/**********************
 * Example get method *
 **********************/

app.get('/racers', async function(req, res) {
  // Define base url
  let apiUrl = `https://api.openf1.org/v1/drivers`

  // Check if there are any query string parameters
  // If so, reset the base url to include them
  // if (req.apiGateway && req.apiGateway.event.queryStringParameters) {
  //  const { start = 0, limit = 20 } = req.apiGateway.event.queryStringParameters
  //  apiUrl = `https://api.openf1.org/v1/drivers`
  // }

  // Call API and return response
  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    res.json({  racers: json.data});
  } catch(error) {
    res.json({ error: error });
  }
});


/****************************
* Example post method *
****************************/

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
