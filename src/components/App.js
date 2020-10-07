import React, { useState, useEffect } from "react";

import Header from "./header/header";
import Loader from "./loader/loader";
import Section_1 from "./section-1/section-1";
import Section_2 from "./section-2/section-2";
import Section_3 from "./section-3/section-3";

import getWeatherData from "./Api";

let typingTimer;
let searchedCity = "";
let doneTypingInterval = 800;

const App = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    searchedCity = "Lucknow";
    getWeather();
  }, []);

  const handleCityInput = (e) => {
    setCity(e.target.value);

    // Checks if user has stopped typing
    clearTimeout(typingTimer);
    if (e.target.value) {
      searchedCity = e.target.value;
      typingTimer = setTimeout(getWeather, doneTypingInterval);
    }
  };

  const dataIsRecent = (timestamp) =>
    new Date(Date.now()).getDate() - new Date(timestamp * 1000).getDate() === 0;

  const getWeather = async () => {
    setLoading(true);

    const localResponse = JSON.parse(
      window.localStorage.getItem("weather_data") || "[]"
    );
    if (localResponse && localResponse.length > 0) {
      const cachedData = localResponse.filter(
        (data) =>
          data.weather_data.city.localeCompare(searchedCity) === 0 &&
          dataIsRecent(data.weather_data.dt)
      );

      if (cachedData.length > 0) {
        setError("");
        setWeatherData(cachedData[0].weather_data);
        setForecastData(cachedData[0].forecast_data);
        setLoading(false);
        return;
      }
    }

    const response = await getWeatherData(searchedCity);

    if (response.error) {
      setError(response.errorMessage);
      setLoading(false);
      return;
    }

    setError("");
    setWeatherData(response.weather_data);
    setForecastData(response.forecast_data);

    localResponse.push(response);
    window.localStorage.setItem("weather_data", JSON.stringify(localResponse));
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="App">
          <Header
            city={city}
            error={error}
            handleCityInput={handleCityInput}
            weatherData={weatherData}
          />
          <Section_1 weatherData={weatherData} />
          <Section_2 weatherData={weatherData} />
          <div className="divider"></div>
          <Section_3 forecastData={forecastData} />
        </div>
      )}
    </>
  );
};

export default App;
