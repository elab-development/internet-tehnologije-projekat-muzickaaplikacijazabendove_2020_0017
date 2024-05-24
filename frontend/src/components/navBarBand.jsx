import React, { useState, useEffect } from 'react'

const NavBarBand = ({band, favBands, removeFromFav, addToFav}) => {

  const [btnFavorite, setBtnFavorites] = useState("");
  const [isFav, setIsFav] = useState(null);

  useEffect(() => {
    let bandId = Number(band.id)
    console.log(favBands)
    console.log(bandId)
    if (favBands.length > 0 && bandId) {
      setIsFav(favBands.some(favBand => Number(favBand.band_id) === bandId));
    }
  }, [favBands, band]);


  useEffect(() => {
    // Postavi dugme na osnovu isFav kada se komponenta učita ili kada se isFav promeni
    console.log(isFav);
    setBtnFavorites(isFav ? "Remove from favorites" : "Add to favorites");
  }, [isFav]);

  const handleFavoriteBand = () => {
    if(isFav) {
      removeFromFav(band);
      setIsFav(false)
    } else {
      addToFav(band);
      setIsFav(true)
    }
  }

  return (
    <div className='navBarBand'>
      <div className='bandName'>
      <h1 style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>{band.name}</h1>
      </div>

      <div className='buttonsContainer'>
        <button className='addToFavoritesButton' onClick={handleFavoriteBand} value={btnFavorite}>{btnFavorite}</button>
      </div>
        
        </div>
  )
}

export default NavBarBand