import React from 'react';
import './App.css';
import CityNear from "./CityNear"
import CityWithinPolygon from "./CityWithinPolygon"
import DistanceBetweenCities from "./DistanceBetweenCities"

function App() {
  return (
    <main>
      <div className="container">
        <CityNear />
      </div>
      <div className="container">
        <CityWithinPolygon />
      </div>
      <div className="container">
        <DistanceBetweenCities />
      </div>
    </main>
  );
}

export default App;
