// need to import 2 things
// TimesContext from the timer context file
// the useContext hook to consume the context
import { TimesContext } from '../Timer-Context/timer-context'
import { useContext } from 'react'

// making the hook function, so we can use it and get the context value and then we can destructure the 
// times and the dispatch function from that. 
export const useTimesContext = () => {
    // pass in the TimesContext object so this hook returns us the value
    // of this context which remember is the value we passed in the TimeContext.Provider component.
    const context = useContext(TimesContext)

    // checking if we're within the scope of the context
    if (!context){
        throw Error('useTimesContext must be used inside an TimesContextProvider')
    }

    // means every time we want to use our times data, we're just going to invoke this useTimesContext hook
    // and get that context value back.
    return context
}