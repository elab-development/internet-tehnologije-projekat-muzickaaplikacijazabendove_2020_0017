import React, { useState, useEffect } from 'react'
import NavBarBand from './navBarBand'
import Comments from './comments'
import Songs from './songs'
import { useParams } from 'react-router-dom'
import Bands from './bands'
import axios from 'axios'

const BandPage = ({bands, favBands, removeFromFav, addToFav, favSongs, addSongToFav, removeSongFromFav, bandRatings, handleRating}) => {
    //Pronalazimo bend iz liste bendova.
    const { bandId } = useParams();
    const band = bands.find(band => band.id === parseInt(bandId)) || {};

    const [comments, setComments] = useState(band.comments || []);
    const [comment, setComment] = useState('');

    //Postavljanje jednog komentara
    const handleComment = async (e) => {
        e.preventDefault();
        const authToken = window.sessionStorage.getItem('auth_token');
        const commentData = {
            content: comment,
            band_id: bandId,
        }
        axios.post('/api/comments', commentData, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then((res)=> {
            console.log(res.data);
            if(res.data.success){
                setComments(prevComments => [...prevComments, res.data.comment]);
                setComment('');
            }else {
                console.log('Error submitting comment');
            }
        }); 
    }


  
    return (
        // <div className='bandItem' style={{backgroundImage: `url(${band.image})`}}>
        <div className='bandItem' style={{backgroundImage: "https://picsum.photos/200"}}>

            <NavBarBand band={band} favBands={favBands} removeFromFav={removeFromFav} addToFav={addToFav} bandRatings={bandRatings} handleRating={handleRating}/>

            <div className='bandInfo'>
                <h3>Genre: {band.genre}</h3>
                <p>Description: {band.description}</p>
            </div>

            <div className='songsSection'>
                <h2>Songs</h2>
                <Songs songs={band.songs} favSongs = {favSongs} addSongToFav={addSongToFav} removeSongFromFav={removeSongFromFav}/>
            </div>

            <div className='commentsSection'>
                <h2>Comments</h2>
                <Comments comments={comments}/>
                <div className="commentInputContainer">
                    <input type="text" 
                        placeholder='Add comment'
                        className='commentInput'
                        onInput={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                </div>
                <button onClick={handleComment}>Comment</button>
            </div>

            
        </div>
    )
}

export default BandPage