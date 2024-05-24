import './App.css';
import Bands from './components/bands';
import Songs from './components/songs';
import NavBar from './components/navBar';
import LogInPage from './components/logInPage';
import SignUpPage from './components/signUpPage';
import BandPage from './components/bandPage';

import axios from 'axios';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  const [token, setToken] = useState();
  const [bands, setBands] = useState([]);
  const [favBands, setFavBands] = useState([]);

  useEffect(() => {
    if(bands.length === 0) {
      axios.get("api/bands").then((res) => {
        console.log(res.data);
        setBands(res.data);
      })
    }
  }, [bands]);

  useEffect(() => {
    if(token) {
      axios.get("api/favoriteBands", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res.data);
        setFavBands(res.data);
      })
    }
  }, [token]);

  function addToken (auth_token) {
    setToken(auth_token);
  }

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
        setFavBands(favBands.filter(favBand => Number(res.data.favBandId) !== Number(favBand.id)));
      } else {
        console.log('Error removing favorite band');
      }
    })
  }

  
  //PRETRAGA
  const [result, setResult] = useState({bands: [], songs: []});
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    if(!query) {
      setIsSearching(false);
      return;
    } 
    setIsSearching(true);
    axios.get(`api/search?query=${query}`).then((res) => {
      console.log(res.data);
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
        <Route path=':bandId' element={<BandPage bands={bands} favBands = {favBands} removeFromFav={removeFromFav} addToFav={addToFav}/>}></Route>
      </Route>

      <Route path='/logIn' element={<LogInPage addToken={addToken}/>}></Route>

      <Route path='/signUp' element={<SignUpPage/>}></Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
