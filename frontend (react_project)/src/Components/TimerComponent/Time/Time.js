import React, {useState, useEffect} from 'react'
import { IconButton } from '@mui/material';
import { BsFillPlayFill, BsFillPauseFill, BsArrowCounterclockwise, BsArrowClockwise, BsXCircle } from "react-icons/bs";
import { useTimesContext } from '../hooks/useTimeContext';
import "./Time.css"

function Time({time}) {

  const [timeValue, setTime] = useState(time.time)
  const [isStarted, setIsActive] = useState(false);
  const [reverse, setReverse] = useState(false);   
  const [forward, setForward] = useState(false);
  const {dispatch} = useTimesContext()

  // STARTING THE TIMER
  // the use effect function takes in a function and an array. the use effect function runs when the component is rendered.
  // pass the setIsActive var into the array so we can control when this useEffect function is ran.
  // when setIsActive is changed that is when this function is executed.
  useEffect(() => {
    let interval = null // use this interval to control starting the acutal time

    if(isStarted) {
      // timer on so initialize this interval
      // increasing the time every ten milli-seconds
      interval = setInterval(() => { // setInterval accepts the arrow function

        // prevTime = arbitrary value that points to what the time var was before
        setTime(prevTime => prevTime + 1) // setting the time variable using setTime (use state method)
      }, 1000) // do this interval every 10 milli-seconds (hundredth of a second).
    } else {
      // timer off
      clearInterval(interval) // stop our timer by clearing the interval that has been set.
      updatePastTime()
      // console.log(timeValue) // check work
    } // if-else

    // cleanup function that helps avoid memory leak when the component get unmounted
    // makes sure to stop the interval when the user leaves the page.
    return () => clearInterval(interval) 
  }, [isStarted])

  // 5 second reverse
  useEffect(() => {
    if(reverse) {
      // timer on so initialize this interval
      setTime(prevTime => prevTime - 5)
    } else {
      console.log("Don't reverse")
      updatePastTime()
    }
    setReverse(false)
  }, [reverse])

   // 5 second reverse
   useEffect(() => {
    if(forward) {
      // timer on so initialize this interval
      setTime(prevTime => prevTime + 5)
    } else {
      console.log("Don't fast forward")
      updatePastTime()
    }
    setForward(false)
  }, [forward])

  // THE THREE FUNCTIONS BELOW ARE USED BY TIME.JS
  // the function is used by the Time.js file to delete a time from the array.
  const deletePastTime = async () => {
    // DELETING DATA FROM DB
    // make a copy of the current pastTimes b/c we don't want to change the current list of past times
    // but instead modify the copy, and set the new state to that copy. We should never modify the state variable.
    // const newTimes = [...pastTimes]
    // finding the "time" in the list of past times that has the matching id.
    // const pastTime = newTimes.find(time => time.id === id)
    const response = await fetch('/api/times/' + time._id, {
      method: 'DELETE',
    })
    const json = await response.json()
    console.log("deletePastTime in Time.js: " + json)

    if (response.ok) {
      dispatch({type: 'DELETE_TIME', payload: json})
    } else {
      setError(json.error)
    }
    // const index = newTimes.indexOf(pastTime) // find index of the time in the past times list
    // The splice() method takes 2 args, the index of the element you wish to remove and the number of elements to remove.
    // newTimes.splice(index, 1);
    // setPastTimes(newTimes)
  }

  const updatePastTime = async () => {
    // modify the values of the resource properties (PATCH REQUEST)
    // make a copy of the current pastTimes b/c we don't want to change the current list of past times
    // but instead modify the copy, and set the new state to that copy. We should never modify the state variable.
    // const newTimes = [...pastTimes]
    // finding the "time" in the list of past times that has the matching id.
    // const pastTime = newTimes.find(time => time.id === id)
    const updateTime = {time: timeValue}
    const response = await fetch('/api/times/' + time._id, {
      method: 'PATCH',
      body: JSON.stringify(updateTime), // turning the dummyTime from an object to a json string
      headers: {
          'Content-Type': 'application/json' // content type is JSON
      } // headers
    })
    const json = await response.json()
    console.log("updatePastTime in Time.js: " + json)

    if (!response.ok) {
      setError(json.error)
    } // if-else

    // const index = newTimes.indexOf(pastTime) // find index of the time in the past times list
    // The splice() method takes 2 args, the index of the element you wish to remove and the number of elements to remove.
    // newTimes.splice(index, 1);
    // setPastTimes(newTimes)
  }

  // the function is used by the Time.js file to update a time in the array.
  function handlePlayButton(e) {
      setIsActive(true)
  }
  
  // the function is used by the Time.js file to update a time in the array.
  function handlePauseButton(e) {
    setIsActive(false)
  }

  function handleReverseFiveSeconds(e) {
    // components re-render themselves when the properties passed is changed or the state variables is changed. 
    setReverse(true)
  }

  function handleForwardFiveSeconds(e) {
    // components re-render themselves when the properties passed is changed or the state variables is changed. 
    setForward(true)
  }

  return (
      <ul className="row">
        {/* // controls each row in the PastTimesList */}
          <li>     
              <IconButton color="primary" aria-label="delete-button" component="label" onClick={deletePastTime}>
                <BsXCircle />
              </IconButton>
          </li>
          <li>  
            <div>
                <span className='text'>{time.title}</span>
                {/* Keeping track of hours, minutes, seconds */}
                {/* to show 2 digits concatenate a 0 and splice the number to always be 2 digits */}
                {/* HOURS */}
                <span>{("0" + Math.floor((timeValue / 3600) % 24)).slice(-2)}:</span>
                {/* MINUTES */}
                <span>{("0" + Math.floor((timeValue / 60) % 60)).slice(-2)}:</span>
                {/* SECONDS */}
                <span>{("0" + Math.floor((timeValue / 1) % 60)).slice(-2)}</span> 
            </div>
          </li>

          <li>
            <div>
              <IconButton color="primary" aria-label="reverse-button" component="label" onClick={handleReverseFiveSeconds}>
                <BsArrowCounterclockwise />
              </IconButton>

              <IconButton color="primary" aria-label="pause-button" component="label" onClick={handlePauseButton}>
                <BsFillPauseFill />
              </IconButton>

              <IconButton color="primary" aria-label="play-button" component="label" onClick={handlePlayButton}>
                <BsFillPlayFill />
              </IconButton>

              <IconButton color="primary" aria-label="fast-forward-button" component="label" onClick={handleForwardFiveSeconds}>
                <BsArrowClockwise />
              </IconButton>
            </div> 
          </li>
      </ul>
  ) // return
} // Time

export default Time;