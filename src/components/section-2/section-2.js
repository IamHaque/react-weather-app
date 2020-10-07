import React from "react";

import "./section-2.css";

const Section_2 = (props) => {
  const misc = props.weatherData.misc ? props.weatherData.misc : null;

  return (
    <div className="section-2">
      <div className="weather-item">
        <span className="weather-item-left">Wind</span>
        <span className="weather-item-right">{misc ? misc.wind : 75}</span>
      </div>
      <div className="weather-item">
        <span className="weather-item-left">Humidity</span>
        <span className="weather-item-right">{misc ? misc.humidity : 75}</span>
      </div>
      <div className="weather-item">
        <span className="weather-item-left">Pressure</span>
        <span className="weather-item-right">{misc ? misc.pressure : 75}</span>
      </div>
      <div className="weather-item">
        <span className="weather-item-left">Cloud Cover</span>
        <span className="weather-item-right">
          {misc ? misc.cloud_cover : 75}
        </span>
      </div>
      <div className="weather-item">
        <span className="weather-item-left">Visibility</span>
        <span className="weather-item-right">
          {misc ? misc.visibility : 75}
        </span>
      </div>
    </div>
  );
};

export default Section_2;
