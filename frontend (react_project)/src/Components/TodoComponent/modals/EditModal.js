import React from 'react'
import '../Style/TodoStyle.css';

const EditModal = props => {
    const currentTask = {};

    currentTask._id = props.todoInfo._id;
    currentTask.text = props.todoInfo.text;
    currentTask.status= props.todoInfo.status;
    currentTask.start= props.todoInfo.start;
    currentTask.end=props.todoInfo.end;
    currentTask.priority= props.todoInfo.priority;
    console.log(props.todoInfo._id);

    const newTask = {
        _id: props.todoInfo._id,
        text: props.todoInfo.text,
        status: props.todoInfo.status,
        start: props.todoInfo.start,
        end: props.todoInfo.end,
        priority: props.todoInfo.priority
    };

    const onCancel = () => {
        props.onCancel();
    }

    const onConfirmEdit = () => {
        if(newTask.priority === ''|| newTask.start === '' || newTask.text === ''){
            throw new Error("Fill out all fields");
        }
        props.onConfirmEdit(newTask);
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
        console.log(newTask);
    }

        return(
        <div className='addModal' >
            <form > 
                <p>Edit task</p>
                <input name="task" type="text" defaultValue={currentTask.text} placeholder='Task name' onChange={handleChange} required></input>
                <select name="status" onChange={handleChange} defaultValue={currentTask.status} required='true' >
                    <option value="" selected disabled hidden>Select a status</option>
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input name="start" placeholder="Start date: " type="date" id='date' onChange={handleChange} defaultValue={currentTask.start} required />
                <input name="end" type="date" placeholder="End date: " onChange={handleChange} defaultValue={currentTask.end} required/>
                <select name="priority" onChange={handleChange} defaultValue={currentTask.priority} required='true' >
                    <option value="" selected disabled hidden>Select a priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirmEdit}>Update</button>
            </form>
        </div>
        );
}
export default EditModal;