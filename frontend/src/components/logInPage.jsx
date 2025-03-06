import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import LoginForm from './loginForm'

const LogInPage = ({addToken}) => {

  return (
    <div className='login'>
      <LoginForm admin={false} addToken={addToken}/>

      <div className='linkContainer'>
        <Link to="/adminLogin"><a className='link-to-admin'>Login as administrator?</a></Link>
      </div>
      
    </div>
  )
}

export default LogInPage