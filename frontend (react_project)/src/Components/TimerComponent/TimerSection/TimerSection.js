import React, {useState, useRef, useEffect} from 'react';

import './TimerSection.css'
import Time from "../Time/Time"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTimesContext } from '../hooks/useTimeContext';
import { useAuthContext } from '../../hooks/useAuthContext'


function TimerSection() {

  // we are going to have access to the input element that involves the "time name" via timeNameRef variable
  // also have access to other input elements that involve number for the time
  const timeNameRef = useRef()
  const hourInput = useRef()
  const minInput = useRef()
  const secInput = useRef()

  const [timeValue, setTime] = useState(0)
  // This is the past times list. That should create a new instance of a past time 
  const[buttonName, setButtonText] = useState("Start") // default set to "Start" text for the button
  const [isStarted, setIsActive] = useState(false);   // controls the color of the button and the stop watch
  const[warningMsg, setWarningText] = useState("") // default set to "Start" text for the button
  const [error, setError] = useState('')

// we are going to use useTimesContext hook to consume our times context
// const [times, setTimes] = useState(null) // so don't need this anymore
  const {times, dispatch} = useTimesContext() // times is null to being with since that is the original state in useReducer function. But once we fetch all the times , we want to update that.

  const {user} = useAuthContext()

  // LOADING DATA FROM DATABASE
  // call this once right when our component loads
  // pass in an empty array of dependencies in order to call this funciton only once b/c empty array never changes
  // fires a callback funciton when the component is rendered. Only done once. (THIS MIGHT CHANGE HOWEVER WHEN WE ADD NEW TIMES TO THE LIST FOR A USER)
  useEffect(() => {
    // getting the storedTimes from database.
    const fetchTimes = async () => {
      // added a proxy field within package.json file to allow different server ports to interact with each other (frontend = 3000 & backend = 4000)
      const response = await fetch('/api/times', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      // checking if the response if ok
      if (response.ok) {
        //setTimes(json) // passing in the json (array of times)

        // dispatch is used to update state object.
        // Pass in an object as arg and the object should have a type property which is a string in all caps that describes in words the state change that we want to make.
        // Second property is the payload property which represents any data we need to make this change. In this case it would be an array of times objects.
        // When we call this dispatch function, in turn our timesReducer function is invoked
        // and it passes the action into the reducer function so it can do its thing and update the state using the info and data.
        dispatch({type: 'SET_TIMES', payload: json}) // payload is the full array of times we get back from the server
      
      if(user){
        fetchTimes()
      }  
      
      } // if
    } // fetch times
  }, [user])

  // STARTING THE TIMER
  // the use effect function takes in a function and an array. the use effect function runs when the component is rendered.
  // pass the setIsActive var into the array so we can control when this useEffect function is ran.
  // when setIsActive is changed that is when this function is executed.
  useEffect(() => {
    let interval = null // use this interval to control starting the acutal time
    if(isStarted) {
      // timer on so initialize this interval
      interval = setInterval(() => { // setInterval accepts the arrow function
        // prevTime = arbitrary value that points to what the time var was before
        setTime(prevTime => prevTime + 1) // setting the time variable using setTime (use state method)
      }, 1000) // increasing the time every second and do this interval every 1 second.
    } else {
      // timer off
      clearInterval(interval) // stop our timer by clearing the interval that has been set.
      // console.log(timeValue) // check work
    } // if-else
    // cleanup function that helps avoid memory leak when the component get unmounted
    // makes sure to stop the interval when the user leaves the page.
    return () => clearInterval(interval) 
  }, [isStarted])

  // reset time to 0, timer is no longer active, reset button to show start
  function handleResetButton(e) {
    setTime(0);
    setIsActive(false); 
    setButtonText("Start");
  } // handleStartButton
  
  const handleStartButton = async (e) => {
    e.preventDefault()

    //if you start the button without being logged in, you get this message
    //if we do have user, it will send the authorization token
    if(!user){
      setError('You must be logged in')
      return
    }
    const timeName = timeNameRef.current.value // get name of task

    // warning message for blank name
    if (timeName === '') {
      setWarningText("Must name the task!")
      notifyWarning()
      return // return nothing when there is nothing in input box
    } 

    // returns the opposite boolean value that control the red/green color on the button
    // setIsActive uses lambda expression that accepts curret as parameter and returns opposite of current
    setIsActive(current => !current); // if started as false then it will become true when button is pressed

    if (buttonName === "Start") {
      setButtonText("Stop");
    } else if (buttonName === "Stop") {
      setTime(0) // reset to 0
      setButtonText("Start");
    } // else-if

    // doesn't compute until the button is pressed
    if (isStarted) {

      // POSTING DATA TO DATABASE
      // create dummy time object that we are going to send as the body of the request
      const dummyTime = {title: timeName, time: timeValue}
      // console.log("Dummy Time" + dummyTime)
      // second arg is an object with some options
      const response = await fetch('/api/times', {
        method: 'POST',
        body: JSON.stringify(dummyTime), // turning the dummyTime from an object to a json string
        headers: {
          'Content-Type': 'application/json', // content type is JSON
          'Authorization': `Bearer ${user.token}`
        } // headers
      }) // fetch
      const json = await response.json() // getting the response from the server (json message and status code in console)
      // console.log(response)
      // console.log(json)

      if(!response.ok) {
        setError(json.error)
      } // if
      if (response.ok) {
        setError(null)
        // reset the ":time input name" everytime the button is pressed
        timeNameRef.current.value = null

        notifySuccess()
        setTime(0)
        // dispatch this action here b/c we want to dispatch it when we have successfully added it to the db b/c if we haven't
        // added it to the db it make no sense to add it to our global application state
        // payload is just the single time added b/c it is added to the existing state times
        dispatch({type: 'CREATE_TIMES', payload: json})
      } // if
    } // if
  } // handleStartButton

  // THESE FUNCTIONS HANDLES WHEN INPUT IS CHANGING IN INPUT BOX. SETS THE TIME VALUE
  function handleHour(e) {
    const hour = hourInput.current.value

    // if there is already a value for setTime
    if (hour >= 24) {
      setWarningText("Choose an hour less than 24!")
      notifyWarning()
      setTime(0)
      return
    } else if (hour < 0) {
      setWarningText("Choose an hour greater than equal to 0")
      notifyWarning()
      setTime(0)
      return
    } else {
      let hourInMilliseconds = hour*3600
      setTime(hourInMilliseconds)
      handleMinute(hourInMilliseconds)
    }
  }

  function handleMinute(hourInMilliseconds) {
    const minute = minInput.current.value
    if (minute >= 60) {
      setWarningText("Choose a minute less than 60!")
      notifyWarning()
      setTime(0)
      return
    } else if (minute< 0) {
      setWarningText("Choose a minute greater than equal to 0")
      notifyWarning()
      setTime(0)
      return
    } else {
      let minuteInMilliseconds = minute*60
      setTime(hourInMilliseconds + minuteInMilliseconds)
      handleSecond(hourInMilliseconds, minuteInMilliseconds)
    }
  }

  function handleSecond(hourInMilliseconds, minuteInMilliseconds) {
    const second = secInput.current.value
    if (second >= 60) {
      setWarningText("Choose a second less than 60!")
      notifyWarning()
      setTime(0)
      return
    } else if (second < 0) {
      setWarningText("Choose a second greater than equal to 0")
      notifyWarning()
      setTime(0)
      return
    } else {
      let secondsInMilliseconds = second*1
      setTime(secondsInMilliseconds + minuteInMilliseconds + hourInMilliseconds)
    }
  }

  const handleSaveButton = async (e) => {

    e.preventDefault()

    //if you start the button without being logged in, you get this message
    //if we do have user, it will send the authorization token
    if(!user){
      setError('You must be logged in')
      return
    }

    // element we are currently referencing that has a value.
    const timeName = timeNameRef.current.value
    
    // WARNING messages
    if (timeName === '') {
      setWarningText("Must name the task!")
      notifyWarning()
      return // return nothing when there is nothing in input box
    } else {
      // POSTING DATA TO DATABASE
      // create dummy time object that we are going to send as the body of the request
      const dummyTime = {title: timeName, time: timeValue}
      // console.log("Dummy Time" + dummyTime)
      // second arg is an object with some options
      const response = await fetch('/api/times', {
        method: 'POST',
        body: JSON.stringify(dummyTime), // turning the dummyTime from an object to a json string
        headers: {
          'Content-Type': 'application/json', // content type is JSON
          'Authorization': `Bearer ${user.token}`
        }
      }) // fetch
      const json = await response.json() // getting the response from the server (json message and status code in console)

      if(!response.ok) {
        setError(json.error)
      } // if
      if (response.ok) {
        setError(null)

        // reset the ":time input name" everytime the button is pressed
        timeNameRef.current.value = null
        hourInput.current.value = null
        minInput.current.value = null
        secInput.current.value = null
        notifySuccess()
        setTime(0)
        // dispatch this action here b/c we want to dispatch it when we have successfully added it to the db b/c if we haven't
        // added it to the db it make no sense to add it to our global application state
        // payload is just the single time added b/c it is added to the existing state times
        dispatch({type: 'CREATE_TIMES', payload: json})
      } // if
    } // else 
  } // handleSaveButton

  function notifySuccess() {
    toast.success('Time Saved', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

  function notifyWarning() {
    toast.warn(warningMsg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  return (
    <>
      <nav>
        <ul className="timedSection">
            {/* <!-- This will hold the topic that we want to time  --> */}
            <li className="nav-item"><input id="topicInput" type="text" placeholder="Task" autoComplete="off" ref={timeNameRef}></input></li>
            <li className="nav-item"><input ref={hourInput} onChange={handleHour} type="number" placeholder="hour (0-23)"></input></li>
            <li className="nav-item"><input ref={minInput} onChange={handleHour} type="number" placeholder="minute (0-59)"></input></li>
            <li className="nav-item"><input ref={secInput} onChange={handleHour} type="number" placeholder="second (0-59)"></input></li>
            <li className="nav-item"><button type="button" onClick={handleSaveButton} id="save">save</button></li>
        </ul>
        <ul className="timedSection">
            
            <li className="nav-item">
              {/* Keeping track of hours, minutes, seconds */}
              {/* to show 2 digits concatenate a 0 and splice the number to always be 2 digits */}
              {/* HOURS */}
              <span>{("0" + Math.floor((timeValue / 3600) % 24)).slice(-2)}:</span>
              {/* MINUTES */}
              <span>{("0" + Math.floor((timeValue / 60) % 60)).slice(-2)}:</span>
              {/* Seconds*/}
              <span>{("0" + Math.floor((timeValue / 1) % 60)).slice(-2)}</span> 
            </li>

            <li className="nav-item">
              <button // the stop/start button
                onClick={handleResetButton} 
                type="button" 
                style={{ 
                  backgroundColor: 'gold',
                  color: 'white',
                }}>
                  Reset
              </button>
            </li>

            {/* <!-- alternates between start and stop --> */}
            <li className="nav-item">
              <button // the stop/start button
                onClick={handleStartButton} 
                type="button" 
                style={{ 
                  backgroundColor: isStarted ? 'red' : 'green',
                  color: 'white',
                }}>
                  {/* The button text that will appear  */}
                  {buttonName} 
              </button>
            </li>
        </ul>
      </nav>
      {/* Check to see if the times response is valid before executing code */}
      {times && times.map((data) => (
        <Time key={data._id} time={data}/>
      ))}
      {/* {times.map((data) => (
        <Time key={data._id} time={data} deletePastTime={deletePastTime}/>
      ))} */}
      {/* renders our toast notification and sets a specific style for all notificaitons */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </>
  );
};
export default TimerSection;
