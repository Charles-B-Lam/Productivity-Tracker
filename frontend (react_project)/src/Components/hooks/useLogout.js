import { useAuthContext } from "./useAuthContext"
import { useTimesContext } from "../TimerComponent/hooks/useTimeContext"

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