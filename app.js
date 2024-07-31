// Import required modules
const express = require('express');
const request = require('request');
const ejs = require('ejs');
require('dotenv').config();

// Create Express app
const app = express();
const port = 9000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Create a route for the home page
app.get('/', (req, res) => {
  res.render('index');
});

// Create a route to handle form submissions
app.get('/weather', (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // Make an API request to OpenWeatherMap
  request(url, (error, response, body) => {
    if (error) {
      console.log('Error:', error);
      res.render('error');
    } else {
      const weatherData = JSON.parse(body);
      res.render('weather', { weatherData, city });
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
