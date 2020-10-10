const API_KEY = process.env.API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const DAILY_API_URL =
  "https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=minutely,hourly";
const DIRECTIONS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];
const WEEKDAYS = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const degToCompass = (angle) => DIRECTIONS[parseInt(angle / 22.5 + 0.5) % 16];

const getWeatherData = async (cityName) => {
  try {
    const response = await fetch(
      `${API_URL}${cityName}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (!data || data.cod != "200") {
      return {
        error: true,
        errorMessage: "Invalid city name!",
      };
    }

    const dt = data.dt;
    const city_name = data.name;
    const country_name = data.sys.country;
    const temp = data.main.temp;
    const temp_min = data.main.temp_min;
    const temp_max = data.main.temp_max;
    const wind = `${degToCompass(data.wind.deg)} - ${data.wind.speed} m/s`;
    const humidity = data.main.humidity + "%";
    const pressure = data.main.pressure + " hPa";
    const cloud_cover = data.clouds.all + "%";
    const visibility = data.visibility;
    const weather_desc = data.weather[0].description;
    const weather_icon = data.weather[0].icon;

    const weather_data = {
      dt,
      city: city_name,
      country: country_name,
      temperatures: {
        temp,
        temp_min,
        temp_max,
      },
      misc: {
        wind,
        humidity,
        pressure,
        cloud_cover,
        visibility,
      },
      weather_desc,
      weather_icon,
    };

    return await getForecaseData(data.coord.lat, data.coord.lon, weather_data);
  } catch (error) {
    return { error: true, errorMessage: "Invalid city name!" };
  }
};

const getForecaseData = async (lat, lon, weather_data) => {
  try {
    const response = await fetch(
      `${DAILY_API_URL}&lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!data)
      return {
        error: true,
        errorMessage: "Invalid city name!",
      };

    const forecast_data = [];
    for (let i = 1; i < 5; i++) {
      const daily_data = data.daily[i];

      const day = WEEKDAYS[new Date(daily_data.dt * 1000).getDay()];
      const temp = daily_data.temp.day;
      const icon = daily_data.weather[0].icon;

      forecast_data.push({
        day,
        temp,
        icon,
      });
    }

    return {
      error: false,
      forecast_data,
      weather_data,
    };
  } catch (error) {
    return { error: true, errorMessage: "Invalid city name!" };
  }
};

export default getWeatherData;
