import React from 'react'
import SongForAdmin from './songForAdmin'

const SongsForAdmin = ({songs, deleteSong, createSong}) => {
  return (
    <div className='songs'>
        {songs.map((song) => (
          <SongForAdmin song={song} key={song.id} deleteSong={deleteSong} createSong={createSong}/>
      ))}
    </div>
  )
}

export default SongsForAdmin