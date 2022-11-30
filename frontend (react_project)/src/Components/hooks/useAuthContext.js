import { AuthContext } from "../Auth-context/AuthContext";
import { useContext } from "react";


//this useAuthContext hook
//if we want to use auth context user value on the state in any component
//we just involve this hook and destructure the user from the context object. 
//we can use the dispatches and update the state 
export const useAuthContext = () =>{
    const context = useContext(AuthContext)

    if(!context){
        throw Error('useAuthContext must be used inside an AuthcontextProvider')
    }

    return context
}