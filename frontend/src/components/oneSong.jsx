import React, { useState, useEffect } from 'react'

const OneSong = ({song, favSongs, addSongToFav, removeSongFromFav, token}) => {

  const [btnFavorite, setBtnFavorites] = useState("");
  const [isFav, setIsFav] = useState(null);

  useEffect(() => {
    let songId = Number(song.id)
    if(favSongs != null) {
      if (favSongs.length > 0 && songId) {
        setIsFav(favSongs.some(favSong => Number(favSong.song_id) === songId));
      }
    }
  }, [song]);

  useEffect(() => {
    setBtnFavorites(isFav ? "Remove from favorites" : "Add to favorites");
  }, [isFav]);

  const handleFavoriteSong = () => {
    if(isFav) {
      removeSongFromFav(song);
    } else {
      addSongToFav(song);
    }
    setIsFav(!isFav);
  }

  return (
    <div className='song'>
      <div className="songDetails">
        <p>{song.title}</p>
        <p>{song.duration}</p>
      </div>
      
      {token != null ? 
      (<div className='buttonsContainer'>
        <button className='addToFavoritesButton' onClick={handleFavoriteSong} value={btnFavorite}>{btnFavorite}</button>
      </div>) : null
      }
      
      </div>
  )

}

export default OneSong