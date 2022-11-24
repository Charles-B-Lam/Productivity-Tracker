import React from 'react'
import MainPage from '../../Mainpage/MainPage'
import "./signUp.css"

{/*This file is responsible for showering successful message when user finish signing up */}
const SignupFormSuccess = () => {
  return (
    <div className="container">
        <div className="app-wrapper">
            <h1 className="form-success"> Account was created</h1>
        </div>
    </div>
  )
}

export default SignupFormSuccess