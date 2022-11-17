import React from 'react';
import '../Style/TodoStyle.css';

const TodoHeader = () => {
    return(
        <div className='grid-container'>
            <div className='grid-item'>Task</div>
            <div className='grid-item'>Status</div>
            <div className='grid-item'>Start</div>
            <div className='grid-item'>End</div>
            <div className='grid-item'>Priority</div>
        </div>
    );
} 

export default TodoHeader;