import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../loginForm';

const AdminLogInPage = ({addToken}) => {

    return (
        <div className='logInPage'>
          <h3>Login as administrator:</h3>
            <LoginForm admin={true} addToken={addToken}/>
        </div>
    )
}

export default AdminLogInPage