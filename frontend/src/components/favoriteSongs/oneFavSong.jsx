import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OneFavSong = ({ favSong, removeSongFromFav }) => {

  const [song, setSong] = useState('');
 

  useEffect(() => {
    console.log(favSong.song_id)
    axios.get(`api/songs/${favSong.song_id}`).then((res) => {
      setSong(res.data);
    })
  }, [favSong.song_id]);

  const handleClick = () => {
    removeSongFromFav(song);
  }


  return (
    
      
      <div className='song'>
        
        <div className='songDetails'>
          <p><h3>{song.title}</h3></p>
          <p>{song.duration}</p>
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
    
  );
}

export default OneFavSong;
