import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {login, error, isLoading} = useLogin()

//It gonna be a async function because we gonna have to make a request in the back end
  const handleSubmit = async(e) =>{
    e.preventDefault()

    await login(email, password)

  }

  return (
    <div className="container">
            <div className="app-wrapper">
                <div>
                    <h2 className="title-signup">Log In</h2>
                </div>
                <form className="form-wrapper" onSubmit={handleSubmit}>
                
                <div className="email">
                    {/*Below is text box for user to type it email */}
                    <label className="label"> Email</label>
                    <input 
                    className="input" 
                    type="email"   
                    //everytime a user type something, we gonna update it to our email state
                    onChange={(e) => setEmail(e.target.value)} //when value change, we want to update the state
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
                  {/*disable loading if the loading is true */}
                    <button className="submit" disabled={isLoading}> 
                      Login
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
  )
}

export default Login