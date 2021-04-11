import React from 'react';
import TaskForm from './TaskForm';
import List from '../List'

const Tasks = ({handleChange, handleSubmit, taskList, taskView, taskInput}) => {
  console.log(taskView)
    if (taskView) {
      return (
      <>
        <List taskList={taskList} />
        <input value={taskInput} type="text" onChange={handleChange} placeholder="Title"/>
        <button>Submit</button>
      </>
      );
    } else {
      return <TaskForm handleSubmit={handleSubmit} handleChange={handleChange} />
    }
}

export default Tasks;