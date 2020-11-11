import React, {useState, useRef} from 'react'
import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'
import Nav from './components/Nav'
import data from './data'


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
  duration: 0,
  animationPercentage: 0,
})
const [libraryStatus, setLibraryStatus] = useState(false)


const timeUpdateHandler = (e) => {
  const current = e.target.currentTime
  const duration = e.target.duration
  const roundedCurrent = Math.round(current)
  const roundedDuration = Math.round(duration)
  const animation = Math.round((roundedCurrent / roundedDuration)* 100)
  console.log(animation)
  setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation})
}

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setSongs={setSongs} songs={songs} audioRef ={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong= {currentSong} setSongInfo={setSongInfo} songInfo= {songInfo} setCurrentSong={setCurrentSong} />
      <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setSongs={setSongs} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref= {audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
