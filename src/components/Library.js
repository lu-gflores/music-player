import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({songs, setCurrentSong}) => {
 return(
     <div className='library'>
         <h2>Library</h2>
         <div className="library-songs">
            {songs.map(song => <LibrarySong key={song.id} id={song.id} songs={songs} song={song} setCurrentSong={setCurrentSong} />)}
         </div>
     </div>
 )   
}
export default Library