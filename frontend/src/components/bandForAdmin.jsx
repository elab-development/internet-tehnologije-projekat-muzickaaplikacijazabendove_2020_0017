import React, { useEffect, useState } from 'react'
import SongsForAdmin from './songsForAdmin';
import axios from 'axios';
import CommentsForAdmin from './commentsForAdmin';
import InputMask from 'react-input-mask';

const BandForAdmin = ({band, deleteBand, createSong, deleteSong}) => {

    const [comments, setComments] = useState(band.comments);
    const [songs, setSongs] = useState([band.songs]);
    const [details, setDetails] = useState(false);

    const [songTitle, setSongTitle] = useState('');
    const [songDuration, setSongDuration] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        deleteBand(band);
    }

    const handleDetails = () => {
        setDetails(!details);
        console.log(songs);
        console.log(band.comments);
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
        setSongs([...songs, songData]);
        setSongTitle('');
        setSongDuration('');
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
        //   const index = comments.findIndex(comment => comment.id === response.commentId);
        //   const newComments = [...comments];
        //   newComments.splice(index, 1);
        //   setComments(newComments);
            const updatedComments = comments.filter(c => c.id !== comment.id);
            setComments(updatedComments);

        }
      } catch (error) {
        console.error('There was an error deleting the band!', error);
      }
    };

    
    return (
        <div className='song'>
            <div className='songDetails'>
            <p><h3>{band.name}</h3></p>
            <p>{band.genre}</p>
            </div>
            <div className='buttonsContainer'>
                <button className='addToFavoritesButton' onClick={handleDetails}>Details</button>
            
            </div>
            <div className='buttonsContainer'>
                <button className='addToFavoritesButton' onClick={handleClick}>Remove</button>
            
            </div>

            { details ?
                (<div className='details'>
                    <div className="songsForAdmin">
                        <SongsForAdmin songs={band.songs} deleteSong={deleteSong} createSong={createSong} band={band}/>
                    </div>
                    <div className="create-band-form">
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
                        <button type="submit">Create Song</button>
                        </div>
                    </form>
                    </div>

                    <div className="commentsForAdmin">
                        <CommentsForAdmin comments={band.comments} deleteComment={deleteComment}/>
                    </div>
                </div>) : null
            }

            
            




        </div>
    )
}

export default BandForAdmin