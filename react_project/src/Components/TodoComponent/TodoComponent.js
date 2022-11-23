import React from 'react'
import { useContext, useState } from 'react'
import TodoHeader from './TodoItem/TodoHeader';
import TodoList from './TodoList/TodoList';
import BackDrop from './modals/BackDrop';
import TodosContext from './Todo-Context/todo-context'
import AddModal from './modals/AddModal'
import todoPic from './Style/todo-pic.png'
import Todo from './Todo.js'

const TodoComponent = () => {
    
    const todoList = useContext(TodosContext);
    const [modalOpen, setModalOpen] = useState(false);

    function todoListHandler(props) {
        setModalOpen(true);
    }

    const confirmAdd = props => { 
        todoList.addTodo(props);
        setModalOpen(false);
        console.log(props);
    }

    const closeModal = props => {
        setModalOpen(false);
    }

    return (
            <div>
                <TodoHeader />
                <div className='grid-container-tasks-button'>
                    <button className='add-button' type='submit' onClick={todoListHandler}>Add task</button>
                </div>
                { modalOpen && <AddModal onCancel={closeModal} onConfirm={confirmAdd}/>}
                { modalOpen && <BackDrop onCancel={closeModal}/> }
                <Todo />
                {/* <TodoList todos={todoList.todos}/> */}
                <img src={todoPic} alt='clipboard' width="200px" height="225px" ></img>
            </div>
    );
}

export default TodoComponent;