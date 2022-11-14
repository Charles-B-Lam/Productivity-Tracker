import React from 'react'
import { useContext, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'
import BackDrop from './BackDrop';
import TodosContext from '../Todo-Context/todo-context.js'
import AddModal from './AddModal';


const TodoComponent = () => {
    
    const todoList = useContext(TodosContext);
    const [modalOpen, setModalOpen] = useState(false);

    function todoListHandler(props) {

        setModalOpen(true);

        // const newTask = {
        //     id: Math.random().toString(),
        //     text: "hw",
        //     status: "",
        //     start: "",
        //     end: "",
        //     priority: ""
        // }
        // todoList.addTodo(newTask);
    }

    const confirmAdd = props => { 
        setModalOpen(false);
    }

    const closeModal = props => {
        setModalOpen(false);
    }

    return (
        <div>
            <TodoHeader />
            <div className='grid-container-tasks'>
                <button className='add-button' type='submit' onClick={todoListHandler}>Add task</button>
            </div>
           <TodoList todos={todoList.todos}/>
           { modalOpen && <AddModal onCancel={closeModal} onConfirm={confirmAdd} />}
           { modalOpen && <BackDrop onCancel={closeModal}/> }
        </div>
    );
}

export default TodoComponent;