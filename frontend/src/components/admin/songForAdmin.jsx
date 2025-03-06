import React from 'react'


const SongForAdmin = ({song, deleteSong, createSong}) => {

  const handleDeleteSong = () => {
    deleteSong(song);
  }

  return (
    <div className='song'>
      {song.title}
      <div className='buttonsContainer'>
        <button className='addToFavoritesButton' onClick={handleDeleteSong}>Delete song</button>
      </div>
      </div>
  )
}

export default SongForAdmin