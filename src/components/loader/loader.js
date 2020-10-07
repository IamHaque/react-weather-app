import React from "react";

import "./loader.css";

const Loader = () => (
  <div className="loader-wrapper">
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
    <p>Loading Weather</p>
  </div>
);

export default Loader;
