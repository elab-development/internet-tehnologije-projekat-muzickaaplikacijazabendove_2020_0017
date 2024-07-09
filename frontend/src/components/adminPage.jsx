import axios from 'axios';
import React, { useState } from 'react'

const AdminPage = () => {

// Dugme za kreiranje benda
// Prikazani svi bendovi i komentari i pored svakog opcija za brisanje

const [bandName, setBandName] = useState('');
const [bandGenre, setBandGenre] = useState('');
const [bandDescription, setBandDescription] = useState('');

const handleCreateBand = async (e) => {
    e.preventDefault();
    
    const bandData = {
      name: bandName,
      genre: bandGenre,
      description: bandDescription
    };

    try {
      axios.post('/api/bands', bandData).then((res) => {
        console.log(res.data);
      });
      
      setBandName('');
      setBandGenre('');
      setBandDescription('');
    } catch (error) {
      console.error('There was an error creating the band!', error);
    }
  };


  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleCreateBand}>
        <div>
          <label>Band Name:</label>
          <input 
            type="text" 
            value={bandName} 
            onChange={(e) => setBandName(e.target.value)} 
          />
        </div>
        <div>
          <label>Band Genre:</label>
          <input 
            type="text" 
            value={bandGenre} 
            onChange={(e) => setBandGenre(e.target.value)} 
          />
        </div>
        <div>
          <label>Band Description:</label>
          <textarea 
            value={bandDescription} 
            onChange={(e) => setBandDescription(e.target.value)} 
          />
        </div>
        <button type="submit">Create Band</button>
      </form>
      {/* Display all bands and comments with delete options here */}
    </div>
  )
}

export default AdminPage