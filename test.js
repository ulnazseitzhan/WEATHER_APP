const axios = require('axios');
require('dotenv').config();

async function testWeather() {
  try {
    const city = 'Astana'; // тестовый город
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric'
      }
    });
    console.log(response.data);
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

testWeather();
