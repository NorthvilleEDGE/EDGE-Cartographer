import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function mapRange(value, fromSource, toSource, fromTarget, toTarget) {
  return (value - fromSource) / (toSource - fromSource) * (toTarget - fromTarget) + fromTarget;
}

function App() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [circlePosition, setCirclePosition] = useState({ top: "0px", left: "0px"});
  var imgRef = useRef();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        function(position) {
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          if (imgRef.current) {
            setCirclePosition({
              top: `${mapRange(location.lat, 42.426613, 42.409726, 0, imgRef.current.offsetWidth)}px`,
              left: `${mapRange(location.lng, -83.483743, -83.471405, 0, imgRef.current.offsetHeight)}px` });
          }
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
        <img ref={imgRef} src="map.jpg" className="App-map" alt="cass-benton-map" />
        <div className="circle" style={circlePosition}></div>
      </header>
    </div>
  );
}

export default App;
