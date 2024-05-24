import React from 'react'
import OneSong from './oneSong'

const Songs = ({songs}) => {
  return (
    <div className='allSongs'>
        {
          songs.map((song)=> (
            <OneSong song={song} key={song.id}/>
          ))
        }
    </div>
  )
}

export default Songs