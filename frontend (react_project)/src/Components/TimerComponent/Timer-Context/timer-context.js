import { createContext, useReducer } from 'react' // provides global state to many different components

// make a new context and store in const
export const TimesContext = createContext()

// we might add a new time to the database and at that point to keep the local states 
// in sync with the database we would dispatch a create time action so that 
// locally in our application we have that new time.

// HOW THIS PROCCESS WORKS: dispatch() => timesReducer => check action.type => update state object with times property => times property will change from null to whatver the payload on the action is (that might be the entire array of times we get back from the server)

// 2 args
// 1st: the state which is the previous state before we make the change to it (object that has times property in useReducer function)
// 2nd: the action is the object that we passed into the dispatch function that has type and payload property
export const timesReducer = (state, action) => {
    // What we do in this function?
    // We first check the action type (what we actually want to do with the data so there are many actions we can do) so use switch statement.
    switch(action.type) {
        // we have different cases for different values of the action type 
        // we return a new value that we want the state to be (return new object with times property)
        case 'SET_TIMES':
            return {
                times: action.payload
            }
        case 'CREATE_TIMES':
            // return an object that has times property which is a new array.
            // add the action.payload (single new time object so we're adding new time to the array)
            // and we want the rest of the times data as well so use ... to spread the current state.times property (the previous states). The "times attached to state." would be an array of pre-existing time objects
            return {
                times: [action.payload, ...state.times] // add new object to beginning of array
            }
        case 'DELETE_TIME':
            // fire a function for each time.
            // returns true if we want time to remain in the new array
            // returns false if we want time to be removed from the new array
            return {
                times: state.times.filter((t) => t._id !== action.payload._id )// keep the elements that are not equal to the action.payload._id
            }
        default:
            return state // return the state unchanged
    } // switch
}
 
// provide the context to our app component tree so that our components can access it
// "children" property represents whatever components or template this component right here "that's accepting the props wraps" 
// so in this case the children property represents the root of timer component
export const TimesContextProvider = ({ children }) => { // will wrap the rest of our app eventually

    // useReducer is similar to useState (get back a state value and a function dispatch to update state value)
    // the difference lies within the timesReducer and dispatch function
    const [state, dispatch] = useReducer(timesReducer, {
        // useReducer has 2 args:
        // reducer function name &
        // initial value for the states
        times: null // updating the global context state now right here
    })

    // return the template (TimeContext)
    return (
        // In this case, we wrap the entire timer component so every 
        // component subset for timer feature has the context (needs to wrap root of component tree)
        // value should be a dynamic state value. In this case, we provide the state and the dispatch so its available in other components
        // if we want to use the state, now we can do and if we want to use the dispatch function to update the state, then now we can do 

        // The way we consume this context and these two values in our components is easy by the built-in hook called useContext (and we specify which context we want to use)
        // I will make a custom hook for each context that I have for ex: I'd make a useTimeContext hook for this context we just made and then whenever I needed to use this context, I'd invoke the hook.
        // use spread operator on the state to spread the diffrent properties inside the object in this case the times property
        <TimesContext.Provider value={{...state, dispatch}}>
            {/* // therefore if we output the "children" inside this provider components then essentially we're outputting the root component */}
            {children}
        </TimesContext.Provider>
    )
} // means all the components will have access to the TimeContext. Add a value prop to the provider tag to provide some context to the components

