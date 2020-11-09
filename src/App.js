import React from 'react'
import Song from './components/Song'
import Player from './components/Player'
function App() {
  return (
    <div className="App">
      <h1>Music Player</h1>
      <Song/>
      <Player />
    </div>
  );
}

export default App;
