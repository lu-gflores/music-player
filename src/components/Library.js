import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, setLibraryStatus}) => {
 return(
     <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
         <h2>Library </h2>
         <div className="library-songs">
            {songs.map(song => <LibrarySong key={song.id} id={song.id} songs={songs} song={song} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs} />)}
         </div>
     </div>
 )   
}
export default Library