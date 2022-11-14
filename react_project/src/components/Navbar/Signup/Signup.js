import React, {useState} from 'react'
import SignupForm from './SignupForm'
import SignupFormSuccess from './SignupFormSuccess'



//where to show signup form or sucess when account created
const Signup = () => {
  //created our state and assigned to false
  const[formIsSubmitted, setFormIsSubmitted] = useState(false);

  const submitForm = () =>{
    setFormIsSubmitted(true);
  }

  return (
    //when form is submited correctly, will show success. If not correct, we will 
    //show sign the form
    <div>
      {!formIsSubmitted ?(
        <SignupForm submitForm = {submitForm} /> //passing prop submit form
      ) : (
        <SignupFormSuccess />
      )}  
    </div>
  )
}

export default Signup