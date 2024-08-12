import React, { useState } from 'react'
import BandForAdmin from './bandForAdmin'

const BandsForAdmin = ({bandsList, deleteBand}) => {

  return (
    <div>
        {bandsList.map((band) => (
          <BandForAdmin band = {band} key={band.id} deleteBand={deleteBand}/>
      ))}
    </div>
  )
}

export default BandsForAdmin