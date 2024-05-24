import React from 'react'

const OneSong = ({song}) => {
  return (
    <div className='song'>{song.title}</div>
    //dodati trajanje i dugme za dodavanje pesme u omiljene
  )
}

export default OneSong