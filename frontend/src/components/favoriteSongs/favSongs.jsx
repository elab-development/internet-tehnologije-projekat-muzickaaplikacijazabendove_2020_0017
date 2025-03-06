import React, { useEffect, useState } from 'react'
import OneFavSong from './oneFavSong';
import axios from 'axios';

const FavSongs = ({allFavSongs, removeSongFromFav}) => {


    if (!allFavSongs || allFavSongs.length === 0) {
      return <p>Nema omiljenih pesama.</p>;
    }
    return (
      <div className='all-fav-songs'>
        <h1>Favorite songs</h1>
        {allFavSongs.map((favSong) => (
          <OneFavSong favSong={favSong} removeSongFromFav = {removeSongFromFav} key={favSong.id} />
        ))}
      </div>
    );
  }

export default FavSongs