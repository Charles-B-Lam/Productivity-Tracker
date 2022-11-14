import React from 'react';

import "./PastTimesList.css"
import Time from "../Time/Time"

// The Past Times component is a list of all the previous times
function PastTimesList({pastTimes, deletePastTime}) {
  return (
    // <div>
    //   {pastTimes.length}
    // </div>
    
    pastTimes.map(time => {
      // passing the key and the time object with the attributes to the Time component
      return < Time key={time.id} time={time} deletePastTime={deletePastTime}/>
    })
  )
}

export default PastTimesList;
