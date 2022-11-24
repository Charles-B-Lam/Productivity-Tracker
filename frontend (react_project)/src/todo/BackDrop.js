import React from 'react'
import './TodoStyle.css';

const BackDrop = props =>{
    return(
        <div className='backdrop' onClick={props.onCancel}></div>
    );
}

export default BackDrop;