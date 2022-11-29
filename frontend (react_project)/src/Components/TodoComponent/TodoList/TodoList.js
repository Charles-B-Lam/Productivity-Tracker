import React from 'react'
import '../Style/TodoStyle.css';
import TodoTask from '../TodoItem/TodoTask';

const TodoList = props => {

    if (props.todos.length === 0) {
        return (
          <div>
              <h2>Create a new task!</h2>
          </div>
        );
      }
      console.log("adding to list.")

  return (
    <div>
        {props.todos.map(task => {
            return(
            <TodoTask 
            id={task.id}
            status={task.status}
            text={task.text}
            start={task.start}
            end={task.end}
            priority={task.priority}
            />
            );
        })}
    </div>
  );
};

export default TodoList;
