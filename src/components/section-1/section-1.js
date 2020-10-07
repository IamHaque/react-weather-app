import React from "react";

import "./section-1.css";

const Section_1 = (props) => {
  const temperatures = props.weatherData.temperatures
    ? props.weatherData.temperatures
    : null;

  const weather_icon = props.weatherData.weather_icon
    ? props.weatherData.weather_icon
    : "50n";

  return (
    <div className="section-1">
      <span className="weather-icon">
        <img src={`http://openweathermap.org/img/wn/${weather_icon}@2x.png`} />
      </span>
      <span className="temp">{temperatures ? temperatures.temp : 75}</span>
      <div className="min-max-temp">
        <span className="max-temp">
          <i className="fas fa-caret-up"></i>
          {temperatures ? temperatures.temp_max : 75}
        </span>
        <span className="min-temp">
          <i className="fas fa-caret-down"></i>
          {temperatures ? temperatures.temp_min : 75}
        </span>
      </div>
    </div>
  );
};

export default Section_1;
