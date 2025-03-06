import React from 'react'
import OneBand from './oneBand'

function Bands({bands, currentPage, totalPages, setCurrentPage}) {
  return (
    <div className='page-container'>
    <div className='all-bands'>
      {bands.map((band) => (
        <OneBand band = {band} key={band.id}/>
      ))}
      </div>

      <div className='pagination'>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prethodna
        </button>
        
        <span>Stranica {currentPage} od {totalPages}</span>
        
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Sledeća
        </button>
      </div>

      

    </div>
  )
}


export default Bands