import React from 'react'
import OneBand from './oneBand'

function Bands({bands}) {
  return (
    <div className='all-bands'>
      {bands.map((band) => (
        <OneBand band = {band} key={band.id}/>
      ))}
    </div>
  )
}


export default Bands