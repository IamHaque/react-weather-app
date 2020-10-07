import React from "react";

import "./section-3.css";

const Section_3 = (props) => {
  const forecastData = props.forecastData ? props.forecastData : [];

  return (
    <div className="section-3">
      {forecastData.map((data) => (
        <div key={data.day + data.icon} className="forecast-item">
          <span className="forecast-icon">
            <img src={`http://openweathermap.org/img/wn/${data.icon}.png`} />
          </span>
          <span className="forecast-day">{data.day}</span>
          <span className="forecast-temp">{data.temp}</span>
        </div>
      ))}
    </div>
  );
};

export default Section_3;
