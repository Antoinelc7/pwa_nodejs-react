import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get('http://localhost:3000/score');
        setScore(response.data.score);
      } catch (error) {
        if (!navigator.onLine) {
          const cachedData = await caches.match('http://localhost:3000/score');
          if (cachedData) {
            const data = await cachedData.json();
            setScore(data.score);
          }
        }
      }
    };

    fetchScore();
  }, []);

  return (
    <div>
      <h1>Match Score</h1>
      {score && <p>{score}</p>}
    </div>
  );
}

export default App;