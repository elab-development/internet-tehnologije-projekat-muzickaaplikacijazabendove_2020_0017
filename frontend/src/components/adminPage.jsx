import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BandsForAdmin from './bandsForAdmin';
import { useNavigate } from 'react-router-dom';
import NavBar from './navBar';

const AdminPage = ({ token, bands, handleCreateBand, deleteBand}) => {
  const [bandName, setBandName] = useState('');
  const [bandGenre, setBandGenre] = useState('');
  const [bandDescription, setBandDescription] = useState('');
  const [bandsList, setBandsList] = useState([]);

  const [songTitle, setSongTitle] = useState('');
  const [songDuration, setSongDuration] = useState('');
  const [songs, setSongs] = useState([]);

  const navigate = useNavigate();

  // Odjavljivanje administratora
  function handleLogout() {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'api/logout',
      headers: { 
        'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token")
      }
    };
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      window.sessionStorage.setItem("auth_token", null);
      alert("Uspesno ste se odjavili.");
      navigate('/');
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const loadSongs = async (band) => {
    try {
      const response = await axios.get("/api/songs");
      console.log(response.data);
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  // Kreiranje pesme
  const createSong = async (songData) => {

    try {
      console.log(songData);
      const response = await axios.post('/api/songs', songData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      setSongs((prevSongs) => [...prevSongs, response.data]);
      setSongTitle('');
      setSongDuration('');
      loadSongs();
    } catch (error) {
      console.error('There was an error creating the song!', error);
    }
  };


  // // Brisanje pesme
  const deleteSong = async (song) => {
    try {
      const response = await axios.delete(`/api/songs/${song.id}`, {
        headers: {
          'Authorization': `Bearer ${window.sessionStorage.getItem('auth_token')}`
        }
      });
      console.log(response.data);
      if (response.data.success === true) {
        const index = songs.findIndex(song => song.id === response.data.songId);
        const newSongs = [...songs];
        newSongs.splice(index, 1);
        setSongs(newSongs);
      }
    } catch (error) {
      console.error('There was an error deleting the song!', error);
    }
  };


  // Kreiranje benda
  function handleClick(ev) {
    ev.preventDefault();
    const bandData = {
      name: bandName,
      genre: bandGenre,
      description: bandDescription
    };
    handleCreateBand(bandData);
    setBandName('');
    setBandGenre('');
    setBandDescription('');
  }
  

  return (
    <div>
      <div className='navBar'>
      <h1>Admin Page</h1>
      <NavBar token={token} admin={true}/>
      <div className='loginSignup'>
        <button className='logIn' onClick = {handleLogout} >Log out</button>
        
      </div>
    </div>

      <h1>Admin Page</h1>
      
      <div className="create-band-form">
        <h3>Create Band</h3>
        <form onSubmit={handleClick}>
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


      {/* BENDOVI */}

      <div className='bands'>
        <BandsForAdmin bandsList={bands} deleteBand={deleteBand} createSong={createSong} deleteSong={deleteSong}/>
      </div>


    </div>
  );
};

export default AdminPage;
