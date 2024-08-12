import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  let navigate = useNavigate();

  const handleChange = (e) => {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if(userData.name.trim() && userData.email.trim() && userData.password.trim() && confirmPassword) {

      if (userData.password !== confirmPassword) {
        alert('Lozinke se ne podudaraju.');
        return;
      }

      try {
        // Slanje POST zahteva ka API-ju za registrovanje
        axios.post('api/register', userData)
          .then((res) => {
            console.log(res.data);
          });

          alert('Uspešno ste se registrovali!');
          navigate("/logIn");
      } catch (error) {
        //Obrada greške
        console.error('Greška prilikom registrovanja:', error);
        return;
      }
    } else {
      alert('Popunite sva polja!');
      return;
    }

  }


  return (
    <div className='signUpPage'>
      <input type="username" placeholder='Username' name="name" onChange={handleChange} />
      <input type="email" placeholder='Email' name="email" onChange={handleChange} />
      <input type="password" placeholder='Password' name="password" onChange={handleChange} />
      <input type="password" placeholder='Confirm password' name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />

      <button className='signupButton' onClick={handleSignUp}>Sign Up</button>

    </div>
  )

}

export default SignUpPage
