import React, { useContext, useState } from 'react';
import './TodoStyle.css';
import TodosContext from '../Todo-Context/todo-context.js'

const TodoAddTask = props => {

    const todoList = useContext(TodosContext);
    const [modalOpen, setModalOpen] = useState(false);
    

    function todoListHandler(props) {

        const newTask = {
            id: Math.random().toString(),
            text: "hw",
            status: "",
            start: "",
            end: "",
            priority: ""
        }
        todoList.addTodo(newTask);
    }

    return(
        <div>
            <div className='grid-container-tasks'>
                <button className='add-button' type='submit' onClick={todoListHandler}>Add task</button>
            </div>
        </div>
    );
} 

export default TodoAddTask;