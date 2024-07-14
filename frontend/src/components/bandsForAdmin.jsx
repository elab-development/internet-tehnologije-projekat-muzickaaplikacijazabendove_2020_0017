import React from 'react'
import BandForAdmin from './bandForAdmin'

const BandsForAdmin = ({bandsList, deleteBand, createSong, deleteSong, deleteComment}) => {
  return (
    <div className='allBands'>
        {bandsList.map((band) => (
          <BandForAdmin band = {band} key={band.id} deleteBand={deleteBand} createSong={createSong} 
          deleteSong={deleteSong} deleteComment={deleteComment}/>
      ))}
    </div>
  )
}

export default BandsForAdmin