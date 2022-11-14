import React from 'react'

export default function TimeValue({timeValue}) {
  return (
    <div>
        {/* Keeping track of hours, minutes, seconds, hundredths of a second */}

        {/* 60000 milli-seconds b/c there's 60 seconds in a minute */}
        <span>{("0" + Math.floor((timeValue / 60000) % 60)).slice(-2)}:</span>
        {/* 1000 millisecond = second & modulus 60 because 60 seconds in a minute*/}
        <span>{("0" + Math.floor((timeValue / 1000) % 60)).slice(-2)}:</span> 
        {/* divide by 10 to see how many hundredths of a seconds are */}
        {/* show the moduler 100 b/c every time it reaches 100 then we want it to go down to 0 */}
        {/* to show 2 digits concatenate a 0 and splice the number to always be 2 digits */}
        <span>{("0" + ((timeValue / 10) % 100)).slice(-2)}</span>
    </div>
  )
}
