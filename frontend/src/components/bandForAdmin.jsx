import React from 'react'

const BandForAdmin = ({band, deleteBand}) => {

    const handleClick = () => {
        deleteBand(band);
    }
    
    return (
        <div className='song'>
            <div className='songDetails'>
            <p><h3>{band.name}</h3></p>
            <p>{band.genre}</p>
            </div>

            <div className='buttonsContainer'>
                <button className='addToFavoritesButton' onClick={handleClick}>Remove</button>
            
            </div>
        </div>
    )
}

export default BandForAdmin