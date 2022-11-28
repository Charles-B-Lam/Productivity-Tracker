import React, {useEffect, useState} from 'react'
import validation from './validation';
import './signUp.css'

const SignupForm = ({submitForm}) => {
  
  /*We need to keep track of each input that user entered by using useState hook
  assigning fullname, email, password to empty string
  */
  const [values, setValues] = useState({
      fullname:"",
      email:"",
      password:"",
    }); 

  //error data are set to an empty object
  const [errors, setErrors] = useState({});
  
  const [dataIsCorrect, setDataIsCorrect] = useState(false);



  /*when user enter something, we need to keep track of that value. 
  use onChange property. This will setvalues to each input field.
  whichever input such as fulname, email or password that user type in 
  it will assign the value to those input automically
  */  
  const handleChange = (event) =>{
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  /*HandleFormSubmit .preventDefault stop the page from refreshing 
  when you click submit
  */
  const handleFormSubmit = async (event) =>{
    event.preventDefault();
    setErrors(validation(values)); //if there error when you click signup button, we show the error
    setDataIsCorrect(true);
  };

  //using useEffect hook to check error. Set the value of submit form to true if data correct
  //the success signup will show up 
  useEffect(()=>{
    if(Object.keys(errors).length == 0 && dataIsCorrect){
      submitForm(true);
    }
  },[errors]
  )
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
            <h2 className="title-signup">Create an Account</h2>
        </div>

        <form className="form-wrapper">
          <div className="name">
            {/*Below is text box for user to type it name */}
            <label className="label"> Full Name</label>
            <input 
            className="input" 
            type="text" 
            name="fullname" 
            value={values.fullname} //giving the value to the input tag
            onChange={handleChange}
            />
            {/*If there is error and it is true, we show error in paragraph tag. */}
            {errors.fullname && <p className="error">{errors.fullname}</p>} 

          </div>

          <div className="email">
            {/*Below is text box for user to type it email */}
            <label className="label"> Email</label>
            <input 
            className="input" 
            type="email" 
            name="email" 
            value={values.email} 
            onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>} 
          </div>

          <div className="password">
            {/*Below is text box for user to type it password */}
            <label className="label">Password</label>
            <input 
            className="input" 
            type="password" 
            name="password" 
            value={values.password}
            onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>} 
          </div>

          {/*This is the signup button */}
          <div>
            <button className="submit" onClick={handleFormSubmit}>
              Signup
            </button>
          </div>


        </form>
        
      </div>
    </div>

  )
}

export default SignupForm