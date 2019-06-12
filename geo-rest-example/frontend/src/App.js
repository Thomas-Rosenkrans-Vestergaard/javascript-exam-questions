import React from 'react';
import './App.css';
import CityNear from "./CityNear"
import CityWithinPolygon from "./CityWithinPolygon"
import DistanceBetweenCities from "./DistanceBetweenCities"
import AreaWithin from "./AreaWithin"

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
      <div className="container">
        < AreaWithin
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCk7r-QjpVYLg83Pw5_D_jhvg_0XA_0QZQ&libraries=geometry,drawing,places"
          loadingElement={< div style={{ height: `100%` }} />}
          containerElement={< div style={{ height: `780px`}} />}
          mapElement={< div id="map-container" style={{ height: `600px` }} />}
        />
      </div>
    </main>
  );
}

export default App;
