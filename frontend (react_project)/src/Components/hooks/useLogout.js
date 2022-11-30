import { useAuthContext } from "./useAuthContext"
import { useTimesContext } from "../TimerComponent/hooks/useTimeContext"

//This is a useLogout hook. We don't need to send a request to the back end because
//we have two things that determined if we login. The global state and json web token.
//We can clear the global state by dispatching a logout action 
//and deletethe json web token in the local storage
//if those two thing are gone, we are technically logout
//So if we send a request to the backend, the token and information don't exit
export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: timeDispatch} = useTimesContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        timeDispatch({type: 'SET_TIMES', payload: null}) //clear from the global state
    }

    return {logout}

}