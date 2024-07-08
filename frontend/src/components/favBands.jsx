import React from 'react';
import OneFavBand from './oneFavBand';

const FavBands = ({ favBands, removeFromFav }) => {
  if (!favBands || favBands.length === 0) {
    return <p>Nema omiljenih bendova.</p>;
  }
  return (
    <div className='all-fav-bands'>
      {favBands.map((band) => (
        <OneFavBand band={band} removeFromFav = {removeFromFav} key={band.id} />
      ))}
    </div>
  );
};

export default FavBands;