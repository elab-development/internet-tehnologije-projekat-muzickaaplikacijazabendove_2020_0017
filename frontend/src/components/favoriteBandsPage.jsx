import React from 'react'
import FavBands from './favBands'

const FavoriteBandsPage = ({allFavBands, removeFromFav}) => {
  return (
    <div className='favBandsPage'>
        <FavBands favBands={allFavBands} removeFromFav = {removeFromFav}/>
        
    </div>
  )
}

export default FavoriteBandsPage