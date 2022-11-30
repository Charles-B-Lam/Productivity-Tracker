import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import './signUp.css'

//where to show signup form or sucess when account created
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  //we using our customHook to signup the user when they click submit
  //we gonna be sending that post request to the server to handle that signup 
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    await signup(email, password)

  }
  return (
    <div className="container">
            <div className="app-wrapper">
                <div>
                    <h2 className="title-signup">Create an Account</h2>
                </div>
                <form className="form-wrapper" onSubmit={handleSubmit}>
                
                <div className="email">
                    {/*Below is text box for user to type it email */}
                    <label className="label"> Email</label>
                    <input 
                    className="input" 
                    type="email"   
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />
             
                </div>

                <div className="password">
                    {/*Below is text box for user to type it password */}
                    <label className="label">Password</label>
                    <input 
                    className="input" 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    />  
                </div>

                {/*This is the signup button */}
                <div>
                    <button className="submit" disabled={isLoading}>
                      Signup
                    </button>
                </div>
                {/*It gonna return error if user enter wrong email or short password etc. */}
                {error && <div className="error">{error}</div>} 
                </form>

            </div>
        </div>
  )
}

export default Signup