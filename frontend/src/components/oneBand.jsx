import React from 'react'
import {Link} from "react-router-dom"

function OneBand({band}) {
  return (
    <Link to={`/bands/${band.id}`} className="band-link">
      <div className='band-card'>
        {/* <img className='card-img' src={band.image} alt="bend" /> */}
        <img className='card-img' src={band.image.url} alt="bend" />
        <h3 className='card-title'>{band.name}</h3>
      </div>
    </Link>
  )
}

export default OneBand