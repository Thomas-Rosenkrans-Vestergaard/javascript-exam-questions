import React from 'react';
import './App.css';
import Geo from "./Geo";

function App() {
  return (
    <div className="App">
      <Geo
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCk7r-QjpVYLg83Pw5_D_jhvg_0XA_0QZQ&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;
