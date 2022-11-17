import React from 'react'
import './TodoStyle.css';


const AddModal = props => {

    const rand = Math.random().toString();
    const newTask = {
        id: rand,
        text: "",
        status: "",
        start: "",
        end: "",
        priority: ""
    };

    console.log(newTask.id);
    const onCancel = () => {
        props.onCancel();
    }

    const onConfirm = () =>{
        if(newTask.priority === ''|| newTask.start === '' || newTask.text === ''){
            throw new Error("Fill out all fields");
        }
        console.log(newTask);
        props.onConfirm(newTask);
    }

    const handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        if(name === "task"){
            newTask.text = value;
        }
        else if(name === "status"){
            newTask.status = value;
        }
        else if(name === "start"){
            newTask.start = value;
        }
        else if(name === "end"){
            newTask.end = value;
        }
        else if(name === "priority"){
            newTask.priority = value;
        }
    }


        return(
        <div className='addModal'>
            <form>
                <p>Add new task</p>
                <input name="task" type="text" placeholder='Task name' onChange={handleChange} required/>
                <select name="status" onChange={handleChange} required='true'>
                    <option value="" selected disabled hidden>Select a status</option>
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input name="start" placeholder="Start date: " type="date" id='date' onChange={handleChange} required />
                <input name="end" type="date" placeholder="End date: " onChange={handleChange} required/>
                <select name="priority" onChange={handleChange} required='true'>
                    <option value="" selected disabled hidden>Select a priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>Add</button>
            </form>
        </div>
        );
}
export default AddModal;