const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public')); // фронт

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City required' });

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: city, appid: process.env.OPENWEATHER_KEY, units: 'metric' }
    });

        const data = response.data;
        res.json({
          temperature: data.main.temp,
          description: data.weather[0].description,
          coordinates: { lat: data.coord.lat, lon: data.coord.lon },
          feels_like: data.main.feels_like,
          wind_speed: data.wind.speed,
          country: data.sys.country,
          rain_last_3h: data.rain?.['3h'] || 0
        });
      } catch (error) {
    if (error.response) {
        // Сервер OpenWeather вернул ошибку (например, неверный ключ или город)
        console.log('OpenWeather response error:', error.response.data);
        res.status(500).json({ error: error.response.data.message });
    } else if (error.request) {
        // Запрос был отправлен, ответа не было
        console.log('No response received:', error.request);
        res.status(500).json({ error: 'No response from OpenWeather' });
    } else {
        // Другая ошибка
        console.log('Error', error.message);
        res.status(500).json({ error: error.message });
    }
}
});
