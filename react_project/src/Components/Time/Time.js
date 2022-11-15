import React from 'react'
import { IconButton } from '@mui/material';
import { BsFillPlayFill, BsFillPauseFill, BsXCircle } from "react-icons/bs";

import "./Time.css"

function Time({time, deletePastTime}) {

  function handleDelete() {
    deletePastTime(time.id)
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

              <span>{("0" + Math.floor((time.timeValue / 3600000) % 60)).slice(-2)}:</span>
              {/* 60000 milli-seconds b/c there's 60 seconds in a minute */}
              <span>{("0" + Math.floor((time.timeValue / 60000) % 60)).slice(-2)}:</span>
              {/* 1000 millisecond = second & modulus 60 because 60 seconds in a minute*/}
              <span>{("0" + Math.floor((time.timeValue / 1000) % 60)).slice(-2)}</span> 
              {/* divide by 10 to see how many hundredths of a seconds are */}
              {/* show the moduler 100 b/c every time it reaches 100 then we want it to go down to 0 */}
              {/* to show 2 digits concatenate a 0 and splice the number to always be 2 digits */}
              {/* <span>{("0" + ((timeValue / 10) % 100)).slice(-2)}</span> */}
          </div>

          <div className='buttons'>
            <IconButton color="primary" aria-label="pause-button" component="label">
              <BsFillPauseFill />
            </IconButton>

            <IconButton color="primary" aria-label="play-button" component="label">
              <BsFillPlayFill />
            </IconButton>
          </div> 
      </nav>
  ) // return
} // Time

export default Time;