import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [score, setScore] = useState({ home: 0, away: 0 });

  useEffect(() => {
    const fetchScore = async () => {
      if (!navigator.onLine) {
        const cache = await caches.open('my-cache');
        const cachedResponse = await cache.match(new Request('/score'));
        if (cachedResponse) {
          const cachedScore = await cachedResponse.json();
          setScore(cachedScore);
        }
      } else {
        try {
          const response = await axios.get('http://localhost:3000/score');
          setScore(response.data);
    
          const cache = await caches.open('my-cache');
          const responseToCache = new Response(JSON.stringify(response.data));
          await cache.put(new Request('/score'), responseToCache);
        } catch (error) {
          console.error('Failed to fetch score:', error);
          const cache = await caches.open('my-cache');
          const cachedResponse = await cache.match(new Request('/score'));
          if (cachedResponse) {
            const cachedScore = await cachedResponse.json();
            setScore(cachedScore);
          }
        }
      }
    };

    fetchScore();
  }, []);

  return (
    <div>
      <h1>Match Score</h1>
      <p>Home: {score.home}</p>
      <p>Away: {score.away}</p>
    </div>
  );
}

export default App;