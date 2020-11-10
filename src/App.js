import React, {useState} from 'react'
import Song from './components/Song'
import Player from './components/Player'
import data from './utils'

import './styles/app.scss'

function App() {
  //State
const [songs, setSongs] = useState(data())
const [currentSong, setCurrentSong] = useState(songs[0])
const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="App">
      <h1>Music Player</h1>
      <Song currentSong={currentSong} />
      <Player setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong= {currentSong} />
    </div>
  );
}

export default App;
