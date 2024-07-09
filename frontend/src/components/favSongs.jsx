import React, { useEffect, useState } from 'react'
import OneFavSong from './oneFavSong';
import axios from 'axios';

const FavSongs = ({favSongs, removeSongFromFav}) => {


    if (!favSongs || favSongs.length === 0) {
      return <p>Nema omiljenih pesama.</p>;
    }
    return (
      <div className='all-fav-songs'>
        <h1>Favorite songs</h1>
        {favSongs.map((favSong) => (
          <OneFavSong favSong={favSong} removeSongFromFav = {removeSongFromFav} key={favSong.id} />
        ))}
      </div>
    );
  }

export default FavSongs