import React, { useState, useContext } from 'react'
import './TodoStyle.css';
import DeleteModal from './DeleteModal';
import BackDrop from './BackDrop';
import TodosContext from '../Todo-Context/todo-context.js'
import EditModal from './EditModal';

const TodoTask = props => {

    const todoList = useContext(TodosContext);
    console.log(todoList);

    const [delModalOpen, setDelModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const taskId = props.id;

    const deleteHandler = () => {
        setDelModalOpen(true);
    }

    const editHandler = () => {
        setEditModalOpen(true);
    }

    const closeModal = props => {
        setEditModalOpen(false);
        setDelModalOpen(false);
    }

    const confirmDelete = props => { 
        todoList.delTodo(taskId);
        setDelModalOpen(false);
    }

    const confirmEdit = props => {
        todoList.editTodo(props);
        setEditModalOpen(false);
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
                        <div className='grid-item-tasks-delete'>
                            <button type="button" class="edit-button" onClick={editHandler}>edit</button>
                        </div>
                        { editModalOpen && <EditModal onCancel={closeModal} onConfirmEdit={confirmEdit} todoInfo={props}/>}
                        { editModalOpen && <BackDrop onCancel={closeModal}/> }
                        <div className='grid-item-tasks-delete' > 
                            <button type="button" class="delete-btn" onClick={deleteHandler}>x</button>
                        </div>
                        { delModalOpen && <DeleteModal onCancel={closeModal} onConfirm={confirmDelete} />}
                        { delModalOpen && <BackDrop onCancel={closeModal}/> }
                </div>
    </div>
  );
}

export default TodoTask;
