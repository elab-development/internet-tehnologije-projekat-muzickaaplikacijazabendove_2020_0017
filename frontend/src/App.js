import './App.css';
import Bands from './components/bands';
import Songs from './components/songs';
import NavBar from './components/navBar';
import LogInPage from './components/logInPage';
import SignUpPage from './components/signUpPage';
import BandPage from './components/bandPage';
import FavoriteBandsPage from './components/favoriteBandsPage';
import FavoriteSongsPage from './components/favoriteSongsPage';

import axios from 'axios';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AdminLogInPage from './components/adminLogInPage';
import AdminPage from './components/adminPage';

function App() {

  const [token, setToken] = useState();
  const [bands, setBands] = useState([]);
  const [favBands, setFavBands] = useState([]);   // Omiljeni bendovi
  const [favSongs, setFavSongs] = useState([]);   // Omiljene pesme
  const [bandRatings, setBandRatings] = useState([]);   // Ocene bendova

  // Ucitavanje bendova
  useEffect(() => {
    if(bands.length === 0) {
      axios.get("api/bands").then((res) => {
        console.log(res.data);
        setBands(res.data);
      })
    }
  }, [bands]);

  // Ucitavanje omiljenih bendova ulogovanog user-a
  useEffect(() => {
    if(token) {
      axios.get("api/favoriteBands", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log("Omiljeni bendovi: " + res.data);
        setFavBands(res.data);
      })
    }
  }, [token]);

  // Ucitavanje omiljenih pesama ulogovanog user-a
  useEffect(() => {
    if(token) {
      axios.get("api/favoriteSongs", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res.data);
        setFavSongs(res.data);
      })
    }
  }, [token]);

  // Ucitavanje ocena bendova ulogovanog user-a
  useEffect(() => {
    if(token) {
      axios.get("api/bandRatings", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log("Ocene bendova: " + res.data);
        setBandRatings(res.data);
      })
    }
  }, [token]);

  // Dodavanje tokena kada se user uloguje
  function addToken (auth_token) {
    setToken(auth_token);
  }

  // Dodavanje benda u listu omiljenih
  const addToFav = async (band) => {
    if (!token) {
      console.log("User is not logged in");
      return;
    }
    axios.post('/api/favoriteBands', {
      band_id: band.id
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setFavBands([...favBands, res.data.favoriteBand]);
      } else {
        console.log('Error adding favorite band');
      }
    }) 
  }

  // Izbacivanje benda iz liste omiljenih
  const removeFromFav = async (band) => {
    let bandId = Number(band.id)
    console.log("FavBandId: " + bandId);
    axios.delete(`/api/favoriteBands/${bandId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        const index = favBands.findIndex(favBand => favBand.id === res.data.favBandId);
        const newFavBands = [...favBands];
        newFavBands.splice(index, 1);
        setFavBands(newFavBands);
      } else {
        console.log('Error removing favorite band');
      }
    })
  }

  // Dodavanje pesme u listu omiljenih
  const addSongToFav = async (song) => {
    if (!token) {
      console.log("User is not logged in");
      return;
    }
    axios.post('/api/favoriteSongs', {
      song_id: song.id
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setFavSongs([...favSongs, res.data.favoriteSong]);
      } else {
        console.log('Error adding favorite song.');
      }
    }) 
  }

  // Izbacivanje pesme iz liste omiljenih
  const removeSongFromFav = async (song) => {
    let songId = Number(song.id)
    console.log("FavSongId: " + songId);
    axios.delete(`/api/favoriteSongs/${songId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        const index = favSongs.findIndex(favSong => favSong.id === res.data.favSongId);
        const newFavSongs = [...favSongs];
        newFavSongs.splice(index, 1);
        setFavSongs(newFavSongs);
      } else {
        console.log('Error removing favorite song.');
      }
    })
  }

  // Ocenjivanje bendova
  const handleRating = async (bandId, value) => {
    axios.post('/api/bandRatings', { band_id: bandId, rating: value }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Rating submitted:', response.data);
        // azuriranj bandRatings sa novom ocenom
        setBandRatings(bandRatings => {
          const existingRatingIndex = bandRatings.findIndex(r => r.band_id === bandId);
          if (existingRatingIndex !== -1) {
            const updatedRatings = [...bandRatings];
            updatedRatings[existingRatingIndex] = { ...updatedRatings[existingRatingIndex], rating: value };
            return updatedRatings;
          } else {
            return [...bandRatings, { band_id: bandId, rating: value }];
          }
        })
      })
      .catch(error => {
        console.error('Error submitting rating:', error);
      });
  };

  
  //PRETRAGA BENDOVA
  const [result, setResult] = useState({bands: [], songs: []});
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    if(!query) {
      setIsSearching(false);
      return;
    } 
    setIsSearching(true);
    axios.get(`api/search?query=${query}`).then((res) => {
      console.log("Rezultati pretrazivanja: " + res.data);
      setResult(res.data);
    })
  }
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <div>
          <NavBar token = {token} onSearch={handleSearch}/>
          {isSearching ? (
            <div>
            <h1>Search Results</h1>
            <h3>Bands</h3>
                <ul>
                  {result.bands.map(band => (
                    <li key={band.id}>{band.name}</li>
                  ))}
                </ul>
                <h3>Songs</h3>
                <Songs songs={result.songs}/>
                </div>
          ) : (<Bands bands={bands}/>)}
        </div>
      }> 
      </Route>

      <Route path='/bands'> 
        <Route path=':bandId' element={<BandPage bands={bands} favBands = {favBands} removeFromFav={removeFromFav} addToFav={addToFav}
          favSongs = {favSongs} addSongToFav = {addSongToFav} removeSongFromFav = {removeSongFromFav} bandRatings = {bandRatings} handleRating={handleRating} token={token}/>}></Route>
      </Route>

      <Route path='/logIn' element={<LogInPage addToken={addToken}/>}></Route>

      <Route path='/signUp' element={<SignUpPage/>}></Route>

      <Route path='/favBands' element={<FavoriteBandsPage allFavBands = {favBands} removeFromFav={removeFromFav}/>}></Route>

      <Route path='/favSongs' element={<FavoriteSongsPage allFavSongs = {favSongs} removeSongFromFav = {removeSongFromFav}/>}></Route>

      <Route path="/adminLogin" element={<AdminLogInPage addToken={addToken}/>} />

      <Route path="/adminPage" element={<AdminPage addToken={addToken}/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
