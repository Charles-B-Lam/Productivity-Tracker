import { useState } from "react";
import {useAuthContext} from './useAuthContext'

//this is custom useHook that will handle when we hit that api endpoint of our application
//which gonna signup the user using what the user entered in the input
export const useSignup = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    //This is the function where we take in the user email and password
    const signup = async (email, password) => {
        setIsLoading(true) //we setting true because we just starting the request
        setError(null)

        //here is where we make the post request
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password}) //we are passing email and password in JSON format
        })

        //return us a respone json web token if success else error message
        const json = await response.json() 

        //if the resonse failed, we returned error
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        //if the resonse is okay, we will do three things.
        //1. we want to update the authcontext with the user email we get back
        //2. we need to update the loading state to false because we finish
        //3. we want to store the json web token in the storage somewhere in the browser 
        //so that if the user closes and open the browser again, we will still have that token stored
        //so we know they still login still
        
        if(response.ok){
            //save the user to local storage. So if user close the broswer and go back it still got the token
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}

}