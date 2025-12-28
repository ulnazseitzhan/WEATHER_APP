document.getElementById('getWeather').addEventListener('click', async () => {
  const city = document.getElementById('city').value;
  const res = await fetch(`/api/weather?city=${city}`);
  const data = await res.json();
  document.getElementById('weatherResult').innerHTML = `
    <p>Temperature: ${data.temperature}°C</p>
    <p>Feels Like: ${data.feels_like}°C</p>
    <p>Description: ${data.description}</p>
    <p>Wind: ${data.wind_speed} m/s</p>
    <p>Country: ${data.country}</p>
    <p>Rain last 3h: ${data.rain_last_3h} mm</p>
  `;
});
