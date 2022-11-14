import React, {useState} from 'react'
import './login.css'


//parameter pass as props
function LoginForm({Logon, error}) {
  //gonna be detail for our form
  const [details, setDetails] = useState({name:"", email: "", password: ""});

  //function that handle our submit
  const submitHandler = e =>{
    e.preventDefault(); //dont want the pages to reload or render
    Logon(details); //passing through details
  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="log-inner">
        <h2>Login</h2>

        {/*THis is for checking error, if error we will print out error */}
        {(error != "") ? (<div className="error">{error}</div>): ""}

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          {/*onChange store the name when user enter something */}
          <input type="text" name="name" id="name" onChange={e =>setDetails({...details, name: e.target.value})} value={details.name}/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" onChange={e =>setDetails({...details, email: e.target.value})} value={details.email}/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={e =>setDetails({...details, password: e.target.value})} value={details.password}/>
        </div>

        <input class="loginButton" type="submit" value="Login"/>

      </div>


    </form>
  )
}

export default LoginForm