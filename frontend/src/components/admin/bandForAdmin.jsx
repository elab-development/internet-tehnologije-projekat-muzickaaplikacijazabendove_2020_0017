import React, { useEffect, useState } from 'react'
import SongsForAdmin from './songsForAdmin';
import axios from 'axios';
import CommentsForAdmin from './commentsForAdmin';
import InputMask from 'react-input-mask';

const BandForAdmin = ({band, deleteBand}) => {

    const [comments, setComments] = useState(band.comments);
    const [songs, setSongs] = useState(band.songs);
    const [details, setDetails] = useState(false);

    const [songTitle, setSongTitle] = useState('');
    const [songDuration, setSongDuration] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        deleteBand(band);
    }

    const handleDetails = () => {
        setDetails(!details);
    }
    

    const validateDuration = (duration) => {
        const regex = /^([0-5][0-9]):[0-5][0-9]$/; // Format MM:SS
        const regexWithHours = /^([0-9]{1,2}):[0-5][0-9]:[0-5][0-9]$/; // Format HH:MM:SS
        return regex.test(duration) || regexWithHours.test(duration);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateDuration(songDuration)) {
            console.log('Song duration:', songDuration);
        } else {
            setError('Invalid duration format. Please use MM:SS or HH:MM:SS format.');
        }

        const songData = {
            title: songTitle,
            duration: songDuration,
            band_id: band.id,
        };
        createSong(songData);
        // setSongs([...songs, songData]);
        // setSongTitle('');
        // setSongDuration('');
    };

    // Kreiranje pesme
    const createSong = async (songData) => {
        try {
          console.log(songData);
          const response = await axios.post('/api/songs', songData, {
            headers: {
              'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token")
            }
          });
          console.log(response.data);

          const newSong = response.data.song;
          setSongs([...songs, newSong]);
          console.log(newSong);

          setSongTitle('');
          setSongDuration('');

        } catch (error) {
          console.error('There was an error creating the song!', error);
          alert('Nemoguce kreirati pesmu.');
        }
    };

    // Brisanje pesme
    const deleteSong = async (song) => {
        try {
        const response = await axios.delete(`/api/songs/${song.id}`, {
            headers: {
            'Authorization': `Bearer ${window.sessionStorage.getItem('auth_token')}`
            }
        });
        console.log(response.data);
        if (response.data.success === true) {
            const updatedSongs = songs.filter(s => s.id !== song.id);
            setSongs(updatedSongs);
        }
        } catch (error) {
        console.error('There was an error deleting the song!', error);
        alert('Nemoguce obrisati pesmu.');
        }
    };

    // Brisanje komentara
    const deleteComment = async (comment) => {
      try {
        const response = await axios.delete(`/api/comments/${comment.id}`, {
          headers: {
            'Authorization': `Bearer ${window.sessionStorage.getItem('auth_token')}`
          }
        });
        console.log(response.data);
        if (response.data.success === true) {
            const updatedComments = comments.filter(c => c.id !== comment.id);
            setComments(updatedComments);
        }
      } catch (error) {
        console.error('There was an error deleting the comment!', error);
        alert('Nemoguce obrisati komentar.');
      }
    };

    
    return (
        <div className='bandForAdmin'>
            <div className='topSection'>
                <div className='bandDetails'>
                    <p><h3>{band.name}</h3></p>
                    <p>{band.genre}</p>
                </div>

                <div className='buttonsContainer'>
                    <button className='addToFavoritesButton' onClick={handleDetails}>Details</button>
                </div>
                <div className='buttonsContainer'>
                    <button className='addToFavoritesButton' onClick={handleClick}>Remove</button>
                </div>
            </div>

            { details ?
                (<div className='details'>
                    <div className="songsForAdmin">
                        <SongsForAdmin songs={songs} deleteSong={deleteSong} createSong={createSong} band={band}/>
                    </div>

                    <div className="create-song-form">
                    <h3>Create Song</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label>Song title:</label>
                        <input 
                            type="text" 
                            value={songTitle} 
                            onChange={(e) => setSongTitle(e.target.value)} 
                        />
                        <label>Song duration:</label>
                        <InputMask 
                            mask="99:99" 
                            maskChar={null} 
                            value={songDuration} 
                            onChange={(e) => {
                                setSongDuration(e.target.value);
                            }} 
                            placeholder="MM:SS or HH:MM:SS"
                        />
                        <button type="submit" className='createBtn'>Create Song</button>
                        </div>
                    </form>
                    </div>

                    <div className="commentsForAdmin">
                        <CommentsForAdmin comments={comments} deleteComment={deleteComment}/>
                    </div>
                </div>) : null
            }
        </div>
    )
}

export default BandForAdmin