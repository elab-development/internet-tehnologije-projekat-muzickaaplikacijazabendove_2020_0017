import React, { useState } from 'react'
import SongsForAdmin from './songsForAdmin';
import axios from 'axios';
import CommentsForAdmin from './commentsForAdmin';

const BandForAdmin = ({band, deleteBand, createSong, deleteSong, deleteComment}) => {

    const [comments, setComments] = useState([band.comments]);
    // const [songs, setSongs] = useState([band.songs]);
    const [details, setDetails] = useState(false);

    const handleClick = () => {
        deleteBand(band);
    }

    const handleDetails = () => {
        setDetails(!details);
        console.log(band.songs);
        console.log(band.comments);
    }

    
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
                        <SongsForAdmin songs={band.songs} deleteSong={deleteSong} createSong={createSong}/>
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