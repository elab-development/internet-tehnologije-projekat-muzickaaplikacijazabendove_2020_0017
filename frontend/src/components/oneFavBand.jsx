import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OneFavBand = ({favBand, removeFromFav}) => {

  const [band, setBand] = useState('');

  useEffect(() => {
    console.log(favBand.band_id)
    axios.get(`api/bands/${favBand.band_id}`).then((res) => {
      setBand(res.data);
    })
  }, [favBand.band_id]);

  const handleClick = () => {
    removeFromFav(band);
  }

  return (
    <div className='song'>
        
        <div className='songDetails'>
          <p><h3>{band.name}</h3></p>
          <p>{band.genre}</p>
        </div>

        <div className='buttonsContainer'>
            <button 
              className='addToFavoritesButton' 
              onClick={handleClick}
            >
              Remove
            </button>
          
        </div>
      </div>
  )
}

export default OneFavBand