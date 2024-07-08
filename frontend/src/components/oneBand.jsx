import React from 'react'
import {Link} from "react-router-dom"

function OneBand({band}) {
  return (
    <Link to={`/bands/${band.id}`} className="band-link">
      <div className='band-card'>
        {/* <img className='card-img' src={band.image} alt="bend" /> */}
        <img className='card-img' src="https://picsum.photos/200" alt="bend" />
        <h3 className='card-title'>{band.name}</h3>
      </div>
    </Link>
  )
}

export default OneBand