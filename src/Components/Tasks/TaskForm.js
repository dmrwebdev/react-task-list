import React from 'react';
import './Tasks.css';
import RadioGroup from './RadioGroup'

function TaskForm({taskInput, handleChange, handleSubmit, deleteTask, }) { 
  const radioVals = [1,2,3,4,5]

  const handleChecked = () => {
    const radios = Array.from(document.querySelectorAll('input')).filter(elem => elem.type === 'radio');
    radios.map(elem => {
      if (taskInput[elem.name] && elem.value === taskInput[elem.name]) {
        return elem.checked = true;
      } else {
        return elem.checked = false;
      }
    });
  }
  const addContainer = () => {
    
  }

  return (
    <form className="TaskForm" handlechecked={handleChecked()} onSubmit={handleSubmit} >
      <textarea
        className='task-title'
        name='title'
        placeholder='Title'
        onChange={handleChange}
        value={taskInput.title} />
      <button className="task-delete" onClick={deleteTask} type="button">Delete</button>
      <textarea
        className='task-details'
        name='details'
        placeholder='Details'
        onChange={handleChange}
        value={taskInput.details} />
      <div className="task-modifiers">
        <label>Date
          <input
            id="input-addDate"
            onChange={handleChange}
            type="date"
            name="dueDate"
            value={taskInput.dueDate} />
        </label>
        <RadioGroup
          taskInput={taskInput}
          description="Priority"
          groupName="priority"
          handlechange={handleChange}
          radioVals={radioVals}
          />
        <RadioGroup
          taskInput={taskInput}
          description="Difficulty"
          handlechange={handleChange}
          groupName="difficulty"
          radioVals={radioVals} />
        <RadioGroup
          taskInput={taskInput}
          description="Reward"
          handlechange={handleChange}
          groupName="reward"
          radioVals={radioVals} />
      </div>
      <div className="task-materials">
        <p>Materials</p>
        <div 
          id="material1"
          className="material-container">
          <input 
            id='material1-item'
            onChange={handleChange}
            name="material-item"
            placeholder="Material" />
          <input
            id='material1-price' 
            onChange={handleChange}
            name="material-price"
            placeholder="Price"/>
        </div>
      </div>  
      <button className="task-submit" type="submit">Submit</button>
    </form>
  );
}

export default TaskForm;