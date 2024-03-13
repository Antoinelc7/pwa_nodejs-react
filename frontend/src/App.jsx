import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [score, setScore] = useState({ home: 0, away: 0 });

  useEffect(() => {
    const fetchScore = async () => {
      if (!navigator.onLine) {
        // If the user is offline, get the score from the cache
        const cache = await caches.open('my-cache');
        const cachedResponse = await cache.match(new Request('/score'));
        if (cachedResponse) {
          // If there's a score in the cache, use it
          const cachedScore = await cachedResponse.json();
          setScore(cachedScore);
        }
      } else {
        try {
          const response = await axios.get('http://localhost:3000/score');
          setScore(response.data);
    
          // Store the score in the cache
          const cache = await caches.open('my-cache');
          const responseToCache = new Response(JSON.stringify(response.data));
          await cache.put(new Request('/score'), responseToCache);
        } catch (error) {
          console.error('Failed to fetch score:', error);
          // If the fetch fails, get the score from the cache
          const cache = await caches.open('my-cache');
          const cachedResponse = await cache.match(new Request('/score'));
          if (cachedResponse) {
            // If there's a score in the cache, use it
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