import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function mapRange(value, inputStart, inputEnd, outputStart, outputEnd) {
  return outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (value - inputStart);
}

function App() {
  const [circlePosition, setCirclePosition] = useState({ top: `0px`, left: `0px` });
  const [hasVoted, setHasVoted] = useState(localStorage.getItem("hasVoted") === "true");
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        function(position) {
          const { latitude, longitude } = position.coords;
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

  const handleVote = (vote) => {
    if (!hasVoted) {
      setHasVoted(true);
      localStorage.setItem('hasVoted', true);
      setShowThanks(true);
      const data = {
        vote,
        time: new Date().toISOString()
      };
      axios.post('https://api.sheety.co/f9d11bbf142e359bb68c10619a31a7c3/mapVotes/votes',
        { vote: data })
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + "/map.jpg"} className="App-map" alt="cass-benton-map" />
        <div className="circle" style={circlePosition}></div>
      </header>
      {!hasVoted && (
        <section>
          <p>Do you believe that these signs have had a positive impact on the park?</p>
          <button className='yes-button' onClick={() => handleVote('yes')}>Yes</button>
          <button className='no-button' onClick={() => handleVote('no')}>No</button>
        </section>
      )}
      {showThanks && (
        <div>Thanks for voting!</div>
      )}
    </div>
  );
}

export default App;
