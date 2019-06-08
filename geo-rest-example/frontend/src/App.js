import React from 'react';
import './App.css';
import CityNear from "./CityNear"
import CityWithinPolygon from "./CityWithinPolygon"

function App() {
  return (
    <main>
      <div className="container">
        <CityNear />
      </div>
      <div className="container">
        <CityWithinPolygon />
      </div>
    </main>
  );
}

export default App;
