import React from 'react'
import './TodoStyle.css';

const AddModal = props => {

    const onCancel = () => {
        props.onCancel();
    }

    const onConfirm = () => {
        props.onConfirm();
    }

    return(
        <div className='modal'>
            <p>Add new task</p>
            <input type='text'>task:</input>
            <button className='btn btn--alt' onClick={onCancel}>Cancel</button>
            <button className='btn' onClick={onConfirm}>Delete</button>
        </div>
    );
}

export default AddModal;