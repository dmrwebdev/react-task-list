import React from 'react';
import './Tasks.css';

function TaskForm({taskInput, handleChange, handleSubmit}) { 
  return (
    <div className="TaskForm">
      <div className="task-title">Title</div>
      <div className="task-details">Details</div>
      <div class="task-modifiers">
        <div>Due By</div>
        <div>Difficulty</div>
        <div>Priority</div>
        <div>Reward</div>
        <div>Submit</div>
      </div>
      <div className="task-materials">Materials</div>

    </div>
  );
}

export default TaskForm;


{/* <form className="TaskForm" onSubmit={handleSubmit}>
<input value={taskInput} type="text" onChange={handleChange} placeholder="Title"/>
<div contentEditable="true">Details...</div>
<div>
  <input value={taskInput} type="text" onChange={handleChange} placeholder="Due By"/>
  <input value={taskInput} type="text" onChange={handleChange} placeholder="Priority"/>
  <input value={taskInput} type="text" onChange={handleChange} placeholder="Difficulty"/>
  <input value={taskInput} type="text" onChange={handleChange} placeholder="Reward"/>
  <button>Submit</button>
</div>

{/*       <input value={taskInput} type="text" onChange={handleChange} placeholder="Enter task..."/> */}
