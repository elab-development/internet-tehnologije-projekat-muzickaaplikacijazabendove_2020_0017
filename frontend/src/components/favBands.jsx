import React from 'react';
import OneFavBand from './oneFavBand';

const FavBands = ({ favBands, removeFromFav }) => {
  if (!favBands || favBands.length === 0) {
    return <p>Nema omiljenih bendova.</p>;
  }
  return (
    <div className='all-fav-bands'>
      <h1>Favorite bands</h1>
      {favBands.map((favBand) => (
        <OneFavBand favBand={favBand} removeFromFav = {removeFromFav} key={favBand.id} />
      ))}
    </div>
  );
};

export default FavBands;