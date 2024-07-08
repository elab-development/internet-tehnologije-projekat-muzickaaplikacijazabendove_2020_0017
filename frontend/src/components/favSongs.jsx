import React from 'react'
import OneFavSong from './oneFavSong';

const FavSongs = ({favSongs, removeSongFromFav}) => {
    if (!favSongs || favSongs.length === 0) {
      return <p>Nema omiljenih pesama.</p>;
    }
    return (
      <div className='all-fav-songs'>
        {favSongs.map((song) => (
          <OneFavSong song={song} removeSongFromFav = {removeSongFromFav} key={song.id} />
        ))}
      </div>
    );
  }

export default FavSongs