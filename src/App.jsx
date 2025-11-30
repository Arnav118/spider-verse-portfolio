import React from 'react';
import WebHero from './components/WebHero';

// REMOVED: import AboutMe from './components/AboutMe'; 
// (WebHero handles the navigation internally now)

function App() {
  return (
    <main className="antialiased bg-black">
      <WebHero />
    </main>
  );
}

export default App;