import React from 'react'
import OneSong from './oneSong'

const Songs = ({songs, favSongs, addSongToFav, removeSongFromFav}) => {
  return (
    <div className='allSongs'>
        {
          songs.map((song)=> (
            <OneSong song={song} favSongs={favSongs} key={song.id} addSongToFav={addSongToFav} removeSongFromFav={removeSongFromFav}/>
          ))
        }
    </div>
  )
}

export default Songs