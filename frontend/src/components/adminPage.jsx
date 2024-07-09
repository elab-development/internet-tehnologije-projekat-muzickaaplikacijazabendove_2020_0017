import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BandsForAdmin from './bandsForAdmin';

const AdminPage = ({ token }) => {
  const [bandName, setBandName] = useState('');
  const [bandGenre, setBandGenre] = useState('');
  const [bandDescription, setBandDescription] = useState('');
  const [bandsList, setBandsList] = useState([]);

  // Ucitavanje bendova
  useEffect(() => {
    loadBands();
  }, []);

  const loadBands = async () => {
    try {
      const response = await axios.get("/api/bands");
      console.log(response.data);
      setBandsList(response.data);
    } catch (error) {
      console.error('Error fetching bands:', error);
    }
  };

  // Funkcija za kreiranje benda
  const handleCreateBand = async (e) => {
    e.preventDefault();

    const bandData = {
      name: bandName,
      genre: bandGenre,
      description: bandDescription
    };

    try {
      const response = await axios.post('/api/bands', bandData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      setBandName('');
      setBandGenre('');
      setBandDescription('');
      loadBands();
    } catch (error) {
      console.error('There was an error creating the band!', error);
    }
  };

  // Funkcija za brisanje benda
  const deleteBand = async (band) => {
    try {
      const response = await axios.delete(`/api/bands/${band.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      if (response.data.success === true) {
        const index = bandsList.findIndex(band => band.id === response.data.bandId);
        const newBands = [...bandsList];
        newBands.splice(index, 1);
        setBandsList(newBands);
      }
    } catch (error) {
      console.error('There was an error deleting the band!', error);
    }
  }
  

  return (
    <div>
      <h1>Admin Page</h1>
      <div className="create-band-form">
        <h3>Create Band</h3>
        <form onSubmit={handleCreateBand}>
          <div className="form-group">
            <label>Band Name:</label>
            <input 
              type="text" 
              value={bandName} 
              onChange={(e) => setBandName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Band Genre:</label>
            <input 
              type="text" 
              value={bandGenre} 
              onChange={(e) => setBandGenre(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Band Description:</label>
            <textarea 
              value={bandDescription} 
              onChange={(e) => setBandDescription(e.target.value)} 
            />
            <button type="submit">Create Band</button>
          </div>
          
        </form>
      </div>
      
      <div className='bands'>
        <BandsForAdmin bandsList={bandsList} deleteBand={deleteBand}/>
      </div>


    </div>
  );
};

export default AdminPage;
