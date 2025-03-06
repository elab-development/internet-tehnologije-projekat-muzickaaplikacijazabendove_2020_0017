import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginForm = ({admin, addToken}) => {

    // Podaci za logovanje
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        role: '',
    });

    let navigate = useNavigate();

    // Postavi podatke iz polja
    const handleChange = (e) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const role = admin ? 'admin' : 'user';

        const updatedUserData = { ...userData, role };

        console.log(updatedUserData);

        axios.post('api/login', updatedUserData)
            .then((res) => {
                console.log(res.data);
                if(res.data.success === true){
                    window.sessionStorage.setItem("auth_token", res.data.access_token);
                    addToken(res.data.access_token);
                    admin ? navigate('/adminPage') : navigate('/');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    alert('Pogrešan email ili lozinka. Pokušajte ponovo.');
                } else {
                    console.error('Došlo je do greške:', error.message);
                }
            });
        
    }


  return (
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
  )
}

export default LoginForm