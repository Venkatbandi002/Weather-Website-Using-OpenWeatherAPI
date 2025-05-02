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

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {feels_like, temp,humidity, pressure, sunrise, sunset, wind_speed, visibility} = data.current;
    let {icon, description} = data.current.weather[0];
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-temp">
        <div>Temperature : ${temp} °C</div>
        </div>
    <div class="weather-icon">
        <div><img src="https://openweathermap.org/img/wn/${icon}.png" alt="🌤️,⛈️" class="icon"/></div>
    </div>
    <div class="weather-desc">
        <div>Description : ${description}</div>
    </div>
    <div class="weather-humi">
        <div>Humidity : ${humidity} % </div>
    </div>
    <div class="weather-feel">
        <div>Feels like : ${feels_like} °C</div>
    </div>
    <div class="weather-pres">
        <div>Pressure : ${pressure} mbar</div>
    </div>
    <div class="weather-wind">
        <div>Wind Speed : ${wind_speed} kmph</div>
    </div>
    <div class="weather-visi">
        <div>Visibility : ${visibility} meters </div>
    </div>
    <div class="weather-rise">
        <div>Sunrise : ${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-set">
        <div>Sunset : ${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;
}