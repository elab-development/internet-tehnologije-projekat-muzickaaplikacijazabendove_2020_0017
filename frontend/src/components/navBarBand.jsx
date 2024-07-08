import React, { useState, useEffect } from 'react'
import axios from 'axios';

const NavBarBand = ({band, favBands, removeFromFav, addToFav, bandRatings, handleRating, token}) => {

  const [btnFavorite, setBtnFavorites] = useState("");
  const [isFav, setIsFav] = useState(null);

  useEffect(() => {
    let bandId = Number(band.id)
    setIsFav(favBands.some(favBand => Number(favBand.band_id) === bandId));
  }, [band]);


  useEffect(() => {
    setBtnFavorites(isFav ? "Remove from favorites" : "Add to favorites");
  }, [isFav]);

  useEffect(() => {
    const bandRating = bandRatings.find(r => r.band_id === band.id);
    if (bandRating) {
      setRating(bandRating.rating);
    }
  }, [band, bandRatings]);

  const handleFavoriteBand = () => {
    if(isFav) {
      removeFromFav(band);
    } else {
      addToFav(band);
    }
    setIsFav(!isFav);
  }

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    handleRating(band.id, value);
  };
  

  return (
    <div className='navBarBand'>
      <div className='bandName'>
      <h1 style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>{band.name}</h1>
      </div>

      {token && (
      <div className='ratingsContainer'>
        <div className='ratingContainer'>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleClick(ratingValue)}
                style={{ display: 'none' }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={ratingValue <= (hover || rating) ? "yellow" : "gray"}
                width="24px"
                height="24px"
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                style={{ cursor: 'pointer' }}
              >
                <path d="M12 17.27L18.18 21 16.54 14.39 22 10.49 15.27 10.13 12 4 8.73 10.13 2 10.49 7.46 14.39 5.82 21 12 17.27z" />
              </svg>
            </label>
          );
        })}
        </div>

        
        {rating > 0 && (
          <div className='currentRating'>
            <p>Current Rating: {rating}</p>
          </div>
        )}
      

      </div>
    
      )}

        {token && (
          <div className='buttonsContainer'>
            <button className='addToFavoritesButton' onClick={handleFavoriteBand} value={btnFavorite}>{btnFavorite}</button>
          </div>
        )}
        
    </div>
  )
}

export default NavBarBand