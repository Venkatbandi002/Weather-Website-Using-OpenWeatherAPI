/*https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}*/

let weather = {
    apiKey: "your_real_api_key",
    fetchweather: function (city) {
      fetch(
         "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=10299cfffa3ed0895b5c190c4c467686"
         )
          .then((response) => response.json())
          .then((data) => this.displayWeather(data));
      },
      displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity, feels_like, temp_min, temp_max} = data.main;
        const {speed} = data.wind;
        var y;
        var x = description;
        if (x = "rain") {
          y = "No need";
        } else {
          y = "Yes";
        }
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = "Descriptipn : " + description;
        document.querySelector(".temp").innerText ="Temperature : " + temp + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity : " + humidity + "%";
        document.querySelector(".speed").innerText = "Wind Speed : " + speed + "kmph";
        document.querySelector(".feel").innerText = "Feels Like : " + feels_like + "°C";
        document.querySelector(".min").innerText = "Minimum : " + temp_min + "°C";
        document.querySelector(".max").innerText = "Maximum : " + temp_max + "°C";
        document.querySelector(".umbrilla").innerText = "Umbrilla : " + y;
       },
       search: function () {
        this.fetchweather(document.querySelector(".search-bar").value);
       }
  };
  
  document.querySelector(".search button").addEventListener("click", function (){
    weather.search();
  });
  
  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');
  const currentWeatherItemsEl = document.getElementById('current-weather-items');
  const timezone = document.getElementById('time-zone');
  const countryEl = document.getElementById('country');
  const weatherForecastEl = document.getElementById('weather-forecast');
  const currentTempEl = document.getElementById('current-temp');
  
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const API_KEY ='your_real_api_key';
  
  setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
      const minutes = time.getMinutes();
      const ampm = hour >=12 ? 'PM' : 'AM'
  
      timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
  
      dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
  
  }, 1000);