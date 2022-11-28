import { useState } from "react";
import {useAuthContext} from './useAuthContext'

export const useSignup = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json() //return token if success else error message

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
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