import React, { useState, useEffect } from 'react';
import './App.css';

function mapRange(value, inputStart, inputEnd, outputStart, outputEnd) {
  return outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (value - inputStart);
}

function App() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [circlePosition, setCirclePosition] = useState({ top: `0px`, left: `0px` });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        function(position) {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setCirclePosition({
            top: `${mapRange(latitude, 42.426613, 42.409726, 0, 1590)}px`,
            left: `${mapRange(longitude, -83.483743, -83.471405, 0, 843)}px` });
        },
        function(error) {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + "/map.jpg"} className="App-map" alt="cass-benton-map" />
        <div className="circle" style={circlePosition}></div>
      </header>
    </div>
  );
}

export default App;
