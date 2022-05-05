// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
// GET Route
app.get("/all", getAll);
//getAll function
function getAll(req, res){
  res.send(projectData);
}
// GET Route
app.post("/add", postData);
//postData function 
function postData (req, res){
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
}
const port = 4000;
const hostname = "127.0.0.1";

// function to test the server 
const listening = () =>
console.log(`Server running at http://${hostname}:${port}/`);

// spin up the server
app.listen(port, listening);