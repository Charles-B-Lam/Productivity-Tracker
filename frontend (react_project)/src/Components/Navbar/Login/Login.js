import React, {useState} from 'react'
import LoginForm from './LoginForm';
import './login.css'

function Login() {

  //user data. store in data base, but using for testcase 
  const adminUser = {
    email: "admin@gmail.com",
    password: "hello123"
  }

  //where we get the data from user
  const [user, setUser] = useState({name: "", email: ""});
  //catch if our detail data is correct
  const [error, setError] = useState("");
  
  const Logon = details => {
    console.log(details);
    //if emails and password correct then it logged in
    if(details.email == adminUser.email && details.password == adminUser.password){
      //to log in
      setUser({
        name: details.name,
        email: details.email
      });
    }else{
      setError("Details do not match");
    }
  }

  //logout once you log back in
  //setting setuser back to default
  const Logout = () =>{
    setUser({name: "", email: ""})
  }

  
  return (
    <div className="app">
      {/*if user enter email or email is not empty anymore, we will render welcome and logout button */}
      {(user.email != "")?(
        <div className="welcome"> 
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>

      ):(
        <LoginForm Logon={Logon} error={error}/>
      )}
    
    </div>
  )
}

export default Login