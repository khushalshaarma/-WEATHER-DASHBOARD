const apiKey = "5b1c15c8494590d9389ee08c9c959a2b"; 

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    weatherDiv.classList.remove("hidden");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const { name } = data;
      const { description, icon } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      weatherDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p><strong>Condition:</strong> ${description}</p>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${speed} m/s</p>
      `;
      weatherDiv.classList.remove("hidden");
    })
    .catch(error => {
      weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      weatherDiv.classList.remove("hidden");
    });
}
