import React, {useState, useEffect} from 'react'
import { IconButton } from '@mui/material';
import { BsFillPlayFill, BsFillPauseFill, BsArrowCounterclockwise, BsXCircle } from "react-icons/bs";

import "./Time.css"

function Time({time, deletePastTime}) {

  const [timeValue, setTime] = useState(time.timeValue)
  const [isStarted, setIsActive] = useState(false);   // controls the color of the button and the stop watch

  function handleDelete(e) {
    deletePastTime(time.id)
  }

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
        setTime(prevTime => prevTime + 10) // setting the time variable using setTime (use state method)
      }, 10) // do this interval every 10 milli-seconds (hundredth of a second).

    } else {
      // timer off
      clearInterval(interval) // stop our timer by clearing the interval that has been set.
      // console.log(timeValue) // check work
    } // if-else

    // cleanup function that helps avoid memory leak when the component get unmounted
    // makes sure to stop the interval when the user leaves the page.
    return () => clearInterval(interval) 
  }, [isStarted])

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
    // Remember to not directly modify for example if we were working with a variable that holds an array.
    // don't directly modify that array inside the variable but instead set a new array copy with the change.
    setTime(prevTime => prevTime - 5000)
  }

  return (
      <nav className="row">
        {/* // controls each row in the PastTimesList */}
          <IconButton color="primary" aria-label="play-button" component="label" onClick={handleDelete}>
            <BsXCircle />
          </IconButton>

          <span><p>{time.name}</p></span>  
          <div className='time'>
              {/* Keeping track of hours, minutes, seconds, hundredths of a second */}

              <span>{("0" + Math.floor((timeValue / 3600000) % 60)).slice(-2)}:</span>
              {/* 60000 milli-seconds b/c there's 60 seconds in a minute */}
              <span>{("0" + Math.floor((timeValue / 60000) % 60)).slice(-2)}:</span>
              {/* 1000 millisecond = second & modulus 60 because 60 seconds in a minute*/}
              <span>{("0" + Math.floor((timeValue / 1000) % 60)).slice(-2)}</span> 
              {/* divide by 10 to see how many hundredths of a seconds are */}
              {/* show the moduler 100 b/c every time it reaches 100 then we want it to go down to 0 */}
              {/* to show 2 digits concatenate a 0 and splice the number to always be 2 digits */}
              {/* <span>{("0" + ((timeValue / 10) % 100)).slice(-2)}</span> */}
          </div>

          <div className='buttons'>
          <IconButton color="primary" aria-label="pause-button" component="label" onClick={handleReverseFiveSeconds}>
              <BsArrowCounterclockwise />
            </IconButton>

            <IconButton color="primary" aria-label="pause-button" component="label" onClick={handlePauseButton}>
              <BsFillPauseFill />
            </IconButton>

            <IconButton color="primary" aria-label="play-button" component="label" onClick={handlePlayButton}>
              <BsFillPlayFill />
            </IconButton>
          </div> 
      </nav>
  ) // return
} // Time

export default Time;