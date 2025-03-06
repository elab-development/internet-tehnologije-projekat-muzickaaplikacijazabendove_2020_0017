import React from 'react'
import OneSong from './oneSong'

const Songs = ({songs, favSongs, addSongToFav, removeSongFromFav, token}) => {
  return (
    <div className='allSongs'>
        {
          songs.map((song)=> (
            <OneSong song={song} favSongs={favSongs} key={song.id} addSongToFav={addSongToFav} removeSongFromFav={removeSongFromFav} token={token}/>
          ))
        }
    </div>
  )
}

export default Songs