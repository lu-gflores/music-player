import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'

const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, songs, setCurrentSong, setSongs}) => {
   const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
        if(song.id === nextPrev.id){
            return {
                ...song,
                active: true,
            }
        } else {
            return {
                ...song,
                active: false,
            }
        }
    })

    if(isPlaying) {
        const playPromise = audioRef.current.play()
        if(playPromise !== undefined) {
            playPromise.then((audio) => {
                audioRef.current.play()
            })
        }
    }
    setSongs(newSongs)
   }
    
    //Event Handlers
    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying)
        } else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }
  

    const getTime = (time) => {
        return (
            //formats the time into minutes and seconds
            Math.floor(time / 60) + ':' + ('0' + Math.floor( time % 60)).slice(-2)
        )
    }

    
    //update state of song when user drags the range 
    const dragHandler = e => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime:e.target.value})
    }
    const skipTrackHandlerDirection = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)

        if(direction ==='skip-forward') {
            //if song reaches end of index, go back go 0 index (first song in library)
           await setCurrentSong(songs[(currentIndex + 1) % songs.length])
           activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
        }

        if(direction === 'skip-back') {
            //if song is the first in array, go to last song in the array instead
            if((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1 ]);
                activeLibraryHandler(songs[songs.length - 1 ])
                if(isPlaying) audioRef.current.play();
                return; //with this return, it keeps the next line from running and crashing the app
            }
            //go back one song
          await setCurrentSong(songs[(currentIndex - 1) % songs.length] )
          activeLibraryHandler(songs[(currentIndex - 1) % songs.length] )
        }
        if(isPlaying) audioRef.current.play();
        //console.log(currentIndex + 1)
    }
    //Add styles
    const trackAnim ={
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className='track'>
                <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandlerDirection('skip-back')} className='skip-back' size='2x'icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandlerDirection('skip-forward')} className='skip-forward' size='2x' icon={faAngleRight}/>
            </div>
       
        </div>
    )
}

export default Player
