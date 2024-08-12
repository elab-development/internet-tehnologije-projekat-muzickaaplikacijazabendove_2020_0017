import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminLogInPage = ({addToken}) => {

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
        
          // Slanje POST zahteva ka API-ju za logovanje
          axios.post('api/adminLogin', userData)
          .then((res) => {
            console.log(res.data);
            if(res.data.success === true){
              //ulogovani korisnik
              window.sessionStorage.setItem("auth_token", res.data.access_token);
              addToken(res.data.access_token);
              navigate('/adminPage');
            }
          })
          .catch( (error) => {
          // Obrada greške
          if (error.response && error.response.status === 401) {
            alert('Pogrešan email ili lozinka. Pokušajte ponovo.');
          } else {
            console.error('Došlo je do greške:', error.message);
          } 
        });
    }




    return (
        <div className='logInPage'>
          <h3>Login as administrator:</h3>
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
    )
}

export default AdminLogInPage