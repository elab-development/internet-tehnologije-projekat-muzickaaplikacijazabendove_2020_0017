import React, { useState } from 'react'
import BandForAdmin from './bandForAdmin'

const BandsForAdmin = ({bandsList, deleteBand, createSong, deleteSong}) => {

  return (
    <div className='allBands'>
        {bandsList.map((band) => (
          <BandForAdmin band = {band} key={band.id} deleteBand={deleteBand} createSong={createSong} 
          deleteSong={deleteSong}/>
      ))}
    </div>
  )
}

export default BandsForAdmin