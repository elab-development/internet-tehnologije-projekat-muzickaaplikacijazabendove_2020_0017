import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import axios from "axios";


function NavBar({token, onSearch, admin}) {

  //ODJAVLJIVANJE
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
      //Osvezavamo stranicu da bi se pojavili dugmici za login i signup
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <div className='navBar'>
      {admin ? null
      : 
      <div className='searchBox'>
        <input 
            type='search' 
            placeholder='Search' 
            className='search' 
            name='query'  
            onInput={(e) => setQuery(e.target.value)}
        />
        <button 
            className='searchButton' 
            onClick={handleSubmit}>
              <IoSearch />
        </button>

      </div>}
      <div className='loginSignup'>
        {token == null ? 
        <div>
        <Link to="/logIn"><button className='logIn'>Log in</button></Link>
        <Link to="/signUp"><button className='signUp'>Sign up</button></Link> </div> :
        <div>
          {admin ? null :
          <div>
            <Link to="/favoriteBands"><button className='favoriteBandsPageBtn'>Favorite bands</button></Link>
            <Link to="/favoriteSongs"><button className='favoriteSongsPageBtn'>Favorite songs</button></Link>
          </div>
          }
          <button className='logIn' onClick = {handleLogout} >Log out</button>
        </div>}
        
      </div>
    </div>
  )
}

export default NavBar