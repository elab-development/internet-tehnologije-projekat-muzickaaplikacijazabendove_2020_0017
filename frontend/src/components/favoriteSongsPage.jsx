import React from 'react'
import FavSongs from './favSongs'

const FavoriteSongsPage = ({allFavSongs, removeSongFromFav}) => {
  return (
    <div className='favSongsPage'>
        <FavSongs favSongs={allFavSongs} removeSongFromFav = {removeSongFromFav}/>
        
    </div>
  )
}

export default FavoriteSongsPage