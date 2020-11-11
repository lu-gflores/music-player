import React, {useState, useRef} from 'react'
import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'
import data from './utils'


import './styles/app.scss'

function App() {
  const audioRef = useRef(null)
  //State
const [songs, setSongs] = useState(data())
const [currentSong, setCurrentSong] = useState(songs[0])
const [isPlaying, setIsPlaying] = useState(false)

//State for song time
const [songInfo, setSongInfo] = useState({
  currentTime: 0,
  duration: 0
})

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime
  const duration = e.target.duration
  setSongInfo({...songInfo, currentTime: current, duration})
}

  return (
    <div className="App">
      
      <Song currentSong={currentSong} />
      <Player audioRef ={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong= {currentSong} setSongInfo={setSongInfo} songInfo= {songInfo} />
      <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setSongs={setSongs}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref= {audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
