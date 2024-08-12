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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogInPage from './components/adminLogInPage';
import AdminPage from './components/adminPage';

const CLIENT_ID = "f612827bafd647c1b4e1c792039899a5";
const CLIEN_SECRET = "38dbf6cb0ad04706b4db8efb52c54472";

function App() {
  const [token, setToken] = useState();   //token
  const [bands, setBands] = useState([]);   //svi bendovi
  const [favBands, setFavBands] = useState([]);   //omiljeni bendovi
  const [favSongs, setFavSongs] = useState([]);   //omiljene pesme
  const [bandRatings, setBandRatings] = useState([]);   //ocene bendova

  const [bandName, setBandName] = useState('');   //ime benda
  const [bandGenre, setBandGenre] = useState('');   //zanr benda
  const [bandDescription, setBandDescription] = useState('');   //opis benda
  
  const [result, setResult] = useState({ bands: [], songs: [] });   //rezultat pretrage
  const [isSearching, setIsSearching] = useState(false);    //da li je pretrazeno ili ne

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    //API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIEN_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, []);

  // Ucitavanje bendova
  useEffect(() => {
    loadBands();
  }, []);

  const searchBandImages = async (bandName) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${bandName}&type=artist`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      if (data.artists.items.length > 0) {
        return data.artists.items[0].images;
      }
      return [];
      console.log(data.artists.items.length);
    } catch (error) {
      console.error('Error fetching band images:', error);
      return [];
    }
  };

  const loadBands = async () => {
    try {
      const response = await axios.get("/api/bands");
      console.log(response.data);
      const bandsWithImages = await Promise.all(response.data.map(async band => {
        const images = await searchBandImages(band.name);
        const image = images[0] ? images[0] : 'default_image_url';
        return { ...band, image };
      }));
      setBands(bandsWithImages);
    } catch (error) {
      console.error('Error fetching bands:', error);
    }
  };

  useEffect(() => {
    loadBands();
  }, [accessToken]);

  // Ucitavanje omiljenih bendova
  useEffect(() => {
    if (token) {
      axios.get("api/favoriteBands", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        console.log("Omiljeni bendovi: " + res.data);
        setFavBands(res.data);
      });
    }
  }, [token]);

  // Ucitavanje omiljenih pesama
  useEffect(() => {
    if (token) {
      axios.get("api/favoriteSongs", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data);
        setFavSongs(res.data);
      });
    }
  }, [token]);

  // Ucitavanje ocena bendova
  useEffect(() => {
    if (token) {
      axios.get("api/bandRatings", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        console.log("Ocene bendova: " + res.data);
        setBandRatings(res.data);
      });
    }
  }, [token]);

  // Kreiranje benda
  const handleCreateBand = async (bandData) => {

    try {
      console.log(bandData);
      const response = await axios.post('/api/bands', bandData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      loadBands();
    } catch (error) {
      console.error('There was an error creating the band!', error);
    }
  };

  // Brisanje benda
  const deleteBand = async (band) => {
    try {
      const response = await axios.delete(`/api/bands/${band.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      if (response.data.success === true) {
        const index = bands.findIndex(band => band.id === response.data.bandId);
        const newBands = [...bands];
        newBands.splice(index, 1);
        setBands(newBands);
      }
    } catch (error) {
      console.error('There was an error deleting the band!', error);
    }
  };

  // Dodavanje tokena kada se korisnik prijavi
  const addToken = (auth_token) => {
    setToken(auth_token);
  };

  // Dodaj bend u omiljene
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
    });
  };

  // Ukloni bend iz omiljenih
  const removeFromFav = async (band) => {
    let bandId = Number(band.id);
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
    });
  };

  // Dodaj pesmu u omiljene
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
    });
  };

  // Ukloni pesmu iz omiljenih
  const removeSongFromFav = async (song) => {
    let songId = Number(song.id);
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
    });
  };

  // Ocenjivanje benda
  const handleRating = async (bandId, value) => {
    axios.post('/api/bandRatings', { band_id: bandId, rating: value }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Rating submitted:', response.data);
        setBandRatings(bandRatings => {
          const existingRatingIndex = bandRatings.findIndex(r => r.band_id === bandId);
          if (existingRatingIndex !== -1) {
            const updatedRatings = [...bandRatings];
            updatedRatings[existingRatingIndex] = { ...updatedRatings[existingRatingIndex], rating: value };
            return updatedRatings;
          } else {
            return [...bandRatings, { band_id: bandId, rating: value }];
          }
        });
      })
      .catch(error => {
        console.error('Error submitting rating:', error);
      });
  };

  // Pretrazivanje
  const handleSearch = async (query) => {
    if (!query) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    axios.get(`api/search?query=${query}`).then((res) => {
      console.log("Rezultati pretrazivanja: " + res.data);
      setResult(res.data);
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div>
            <NavBar token={token} onSearch={handleSearch} admin={false}/>
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
                <Songs songs={result.songs} />
              </div>
            ) : (<Bands bands={bands} />)}
          </div>
        } />

        <Route path='/bands'>
          <Route path=':bandId' element={
            <BandPage
              bands={bands} favBands={favBands} removeFromFav={removeFromFav} addToFav={addToFav}
              favSongs={favSongs} addSongToFav={addSongToFav} removeSongFromFav={removeSongFromFav} bandRatings={bandRatings}
              handleRating={handleRating} token={token}
            />
          } />
        </Route>

        <Route path='/favoriteBands' element={<FavoriteBandsPage allFavBands={favBands} />} />
        <Route path='/logIn' element={<LogInPage addToken={addToken} />} />
        <Route path='/signUp' element={<SignUpPage />} />
        
        <Route path='/favoriteSongs' element={<FavoriteSongsPage allFavSongs={favSongs} />} />

        <Route path='/adminLogIn' element={<AdminLogInPage addToken={addToken}/>} />
        <Route path='/adminPage' element={<AdminPage token={token} bands={bands} handleCreateBand={handleCreateBand} deleteBand={deleteBand}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
