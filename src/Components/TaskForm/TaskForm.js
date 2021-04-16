import React, {useState, useEffect} from 'react';
import './Tasks.css';
import RadioGroup from './RadioGroup'
import Materials from './Materials'

const radioVals = [1,2,3,4,5]

function TaskForm({ currentTaskId, taskInput, handleChange, handleSubmit, deleteTask, generateMaterialBox }) { 
  
  const handleChecked = () => {
    const radios = Array.from(document.querySelectorAll('input')).filter(elem => elem.type === 'radio');
    radios.map(elem => {
      return taskInput[elem.name] && elem.value === taskInput[elem.name]
      ? elem.checked = true
      : elem.checked = false
    });
  }
  
  return (
    <form className="TaskForm" handlechecked={handleChecked()} onSubmit={handleSubmit} >
      <textarea
        className='task-title'
        name='title'
        placeholder='Title'
        onChange={handleChange}
        value={taskInput.title} />
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
            value={taskInput.dueDate || ''} />
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
      <Materials
        handleChange={handleChange}
        taskInput={taskInput}
        currentTaskId={currentTaskId}
        generateMaterialBox={generateMaterialBox} />
      <div className="task-controls" >
        <button className="task-submit" type="submit">Submit</button>
        <button className="task-delete" onClick={deleteTask} type="button">Delete</button>
      </div>
    </form>
  );
}

export default TaskForm;