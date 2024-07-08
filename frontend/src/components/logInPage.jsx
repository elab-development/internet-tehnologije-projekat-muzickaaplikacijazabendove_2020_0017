import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const LogInPage = ({addToken}) => {

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userData);
    try {

      // Slanje POST zahteva ka API-ju za logovanje
      axios.post('api/login', userData)
      .then((res) => {
        console.log(res.data);
        if(res.data.success === true){
          //ulogovani korisnik
          window.sessionStorage.setItem("auth_token", res.data.access_token);
          addToken(res.data.access_token);
          navigate('/');
        }
      });
      
    } catch (error) {
      // Obrada greške
      if (error.response.status === 401) {
        alert('Pogrešan email ili lozinka. Pokušajte ponovo.');
      } 
    }


  }


  return (
    <div className='login'>
      <div className='logInPage'>

        <input type='email' 
        placeholder='Email' 
        name="email" 
        onInput={handleChange}></input>
        
        <input type='password' 
        placeholder='Password' 
        name="password" 
        onInput={handleChange}></input>

        <button className='loginButton' onClick={handleSubmit}>Log In</button>
      </div>

      <div className='linkContainer'>
        <Link to="/admin"><a className='link-to-admin'>Login as administrator?</a></Link>
      </div>
      
    </div>
  )
}

export default LogInPage