import React from 'react'
import { IconButton } from '@mui/material';
import { BsFillPlayFill, BsFillPauseFill, BsXCircle } from "react-icons/bs";

import "./Time.css"
import TimeValue from '../TimeValue/TimeValue';

function Time({time, deletePastTime}) {

  function handleDelete() {
    deletePastTime(time.id)
  }

  return (
    <>
      <nav>
        <ul className='row'>
          {/* // controls each row in the PastTimesList */}
            <li><IconButton color="primary" aria-label="play-button" component="label" onClick={handleDelete}>
              <BsXCircle />
            </IconButton> </li>

            <li><><p>{time.name}</p>
            <TimeValue timeValue={time.timeValue} /></></li>

            <li><div className='buttons'>
              <IconButton color="primary" aria-label="pause-button" component="label">
                <BsFillPauseFill />
              </IconButton>

              <IconButton color="primary" aria-label="play-button" component="label">
                <BsFillPlayFill />
              </IconButton>
            </div> </li>
        </ul>
      </nav>
    </>
  ) // return
} // Time

export default Time;