import React, { useState, useEffect } from 'react';
import './App.css';

function mapRange(value, fromSource, toSource, fromTarget, toTarget) {
  return (value - fromSource) / (toSource - fromSource) * (toTarget - fromTarget) + fromTarget;
}

function App() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [circlePosition, setCirclePosition] = useState({ top: "0px", left: "0px" });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        function(position) {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setCirclePosition({
            top: `${mapRange(latitude, 42.426613, 42.409726, 0, 0.53457943925*window.innerHeight)}px`,
            left: `${mapRange(longitude, -83.483743, -83.471405, 0, window.innerHeight)}px` });
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
        <img src="map.jpg" className="App-map" alt="cass-benton-map" />
        <div className="circle" style={circlePosition}></div>
      </header>
    </div>
  );
}

export default App;