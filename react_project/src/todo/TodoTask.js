import React, { useState, useContext } from 'react'
import './TodoStyle.css';
import DeleteModal from './DeleteModal';
import BackDrop from './BackDrop';
import TodosContext from '../Todo-Context/todo-context.js'


const TodoTask = props => {

    const todoList = useContext(TodosContext);

    const [modalOpen, setModalOpen] = useState(false);

    const taskId = props.id;

    const deleteHandler = () => {
        setModalOpen(true);
    }

    const closeModal = props => {
        setModalOpen(false);
    }

    const confirmDelete = props => { 
        todoList.delTodo(taskId);
        setModalOpen(false);
    }

  return (
    <div>
      <div className='grid-container-tasks' key={props.id}>
                        <div className='grid-item-tasks-title' >
                            {props.text}
                            </div>
                        <div className='grid-item-tasks-status' >
                        <select name="status" className='custom-select'>
                            <option value="" selected disabled hidden>{props.status}</option>
                            <option value="Not started">Not started</option>
                            <option value="In progress">In progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        </div>
                        <div className='grid-item-tasks' >{props.start}</div>
                        <div className='grid-item-tasks' >{props.end}</div>
                        <div className='grid-item-tasks' >{props.priority}</div>
                        <div className='grid-item-delete' > 
                            <button type="button" class="delete-btn" onClick={deleteHandler}>x</button>
                        </div>
                        { modalOpen && <DeleteModal onCancel={closeModal} onConfirm={confirmDelete} />}
                        { modalOpen && <BackDrop onCancel={closeModal}/> }
                </div>
    </div>
  );
}

export default TodoTask;
