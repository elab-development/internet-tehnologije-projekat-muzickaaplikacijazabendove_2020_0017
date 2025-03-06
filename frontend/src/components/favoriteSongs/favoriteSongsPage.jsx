import React from 'react'
import FavSongs from './favSongs'

const FavoriteSongsPage = ({allFavSongs, removeSongFromFav}) => {
  return (
    <div className='favSongsPage'>
        <FavSongs allFavSongs={allFavSongs} removeSongFromFav = {removeSongFromFav}/>
        
    </div>
  )
}

export default FavoriteSongsPage