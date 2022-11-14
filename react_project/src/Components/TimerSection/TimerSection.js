import React, {useState, useRef, useEffect} from 'react';

import './TimerSection.css';
import PastTimesList from '../PastTimesList/PastTimesList'
import TimeValue from '../TimeValue/TimeValue'
const { v4: uuidv4 } = require('uuid');

function TimerSection() {

  // we are going to have access to the input element that involves the "time name" via tmeNameRef variable
  const timeNameRef = useRef()
  const LOCAL_STORAGE_KEY = 'timeFeature.times'

  const [timeValue, setTime] = useState(0)
  // This is the past times list. That should create a new instance of a past time 
  const[pastTimes, setPastTimes] = useState([]) 
  const[buttonName, setButtonText] = useState("Start") // default set to "Start" text for the button
  const [isStarted, setIsActive] = useState(false);   // controls the color of the button

  // LOADING
  // call this once our right when our component loads
  // pass in an empty array of dependencies in order to call this funciton only once b/c empty array never changes
  useEffect(() => {
    // getting the storedTimes from local storage.
    const storedTimes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) // parsing the JSON string

    // set our Past Times only if we have any past times stored
    // set storedTimes to the previous Times.
    if (storedTimes) setPastTimes(prevTimes => [...prevTimes, ...storedTimes])
  }, [])

  // SAVING
  // store the times in local storage so we use this hook to do so.
  // So everytime a time is added to a list, it is saved.
  // useEffect takes in another function that helps us save the "pastTimes" everytime it is changed.
  useEffect(() => {
    // we pass the key and the JSON string of our pastTimes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pastTimes))
  }, [pastTimes]) // the function call occurs everytime pastTimes is modified

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
    } // if-else

    // cleanup function that helps avoid memory leak when the component get unmounted
    // makes sure to stop the interval when the user leaves the page.
    return () => clearInterval(interval) 
  }, [isStarted])

  function handleResetButton(e) {
    setTime(0);
    // returns the opposite boolean value that control the red/green color on the button
    // setIsActive uses lambda expression that accepts curret as parameter and returns opposite of current
    setIsActive(false); 
    setButtonText("Start");
  } // handleStartButton
  
  function handleStartButton(e) {
    let count = 0; // starts at 0. 
    count++;
    // returns the opposite boolean value that control the red/green color on the button
    // setIsActive uses lambda expression that accepts curret as parameter and returns opposite of current
    setIsActive(current => !current); // if started as false then it will become true when button is pressed

    if (buttonName == "Start") {
      setButtonText("Stop");
    } else if (buttonName == "Stop") {
      setButtonText("Start");
    } // else-if

    // doesn't compute until the button is pressed
    if (isStarted) {
      // console.log("save to the list") // check
      handleSaveButton() // doesn't actually work until "past time name" is set
    }
  } // handleStartButton

  function handleSaveButton(e) {
    // element we are currently referencing that has a value.
    const timeName = timeNameRef.current.value
    if (timeName == '') return // return nothing when there is nothing in input box

    // setTodos([]) // would clear all todos

    // is a function call that gives us the prevTimes which we are going to add too.
    setPastTimes(prevTimes => {
      // our new timeslist is going to be equal to (...prevTimes in the array + a new time) to that list
      return [...prevTimes, {id: uuidv4(), name: timeName, timeValue: timeValue}]
    })
    
    // console.log(timeName)
    // reset the ":time input name" everytime the button is pressed
    timeNameRef.current.value = null
  }

  function deletePastTime(id) {
    // make a copy of the current pastTimes b/c we don't want to change the current list of past times
    // but instead modify the copy, and set the new state to that copy. We should never modify the state variable.
    const newTimes = [...pastTimes]
    // finding the "time" in the list of past times that has the matching id.
    const pastTime = newTimes.find(time => time.id == id)

    console.log(pastTime)
    const index = newTimes.indexOf(pastTime) // find index of the time in the past times list
    // The splice() method takes 2 args, the index of the element you wish to remove and the number of elements to remove.
    newTimes.splice(index, 1);
    setPastTimes(newTimes)
  }

  return (
    <>
      <nav>
        <ul className="timedSection">
            {/* <!-- This will hold the topic that we want to time  --> */}
            <li className="nav-item"><input id="topicInput" type="text" placeholder="Task" autoComplete="off" ref={timeNameRef}></input></li>
            <li className="nav-item"><input id="hourInput" type="number" placeholder="hour"></input></li>
            <li className="nav-item"><input id="minInput" type="number" placeholder="minute"></input></li>
            <li className="nav-item"><input id="secInput" type="number" placeholder="second"></input></li>
            <li className="nav-item"><button type="button" onClick={handleSaveButton} id="save">save</button></li>
        </ul>
        <ul className="timedSection">
            
            <TimeValue timeValue={timeValue}/>
            {/* {time} */}

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
            {/* <li className="nav-item"><button type="button">stop</button></li> */}
        </ul>
      </nav>
      <PastTimesList pastTimes={pastTimes} deletePastTime={deletePastTime} />
    </>
  );
};
export default TimerSection;
