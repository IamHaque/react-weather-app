import React from "react";

import "./header.css";

const Header = ({ error, weatherData, city, handleCityInput }) => {
  const location =
    weatherData.city && weatherData.country
      ? `${weatherData.city}, ${weatherData.country}`
      : "Lucknow, IN";

  return (
    <div className="header">
      <p className="city-name">{location}</p>
      <div className="input-wrapper">
        <input
          className="city-input"
          type="text"
          value={city}
          onChange={handleCityInput}
          placeholder="Enter city name..."
        />
        {error ? <p className="error">{error}</p> : ""}
      </div>
    </div>
  );
};

export default Header;
