import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BandsForAdmin from './bandsForAdmin';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navBar';

const AdminPage = ({ token, bands, handleCreateBand, deleteBand}) => {
  const [bandName, setBandName] = useState('');
  const [bandGenre, setBandGenre] = useState('');
  const [bandDescription, setBandDescription] = useState('');

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
      {/* <div className='loginSignup'>
        <button className='logIn' onClick = {handleLogout} >Log out</button>
        
      </div> */}
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

      <div className='bandsForAdmin'>
        <BandsForAdmin bandsList={bands} deleteBand={deleteBand}/>
      </div>


    </div>
  );
};

export default AdminPage;
