import React, { useState } from 'react';
import './App.css';
import data from '../data.json'
import List from './List'
import TaskForm from './Tasks/TaskForm'
import Sidebar from './Sidebar/Sidebar';
import Tasks from './Tasks/Tasks';


const App = () => { 
  const [ taskList, setTaskList ] = useState(data);
  const [ taskInput, setTaskInput ] = useState('');
  const [ taskView, setTaskView ] = useState(false)
//for now true is list view and false is task form

  const handleToggle = (event) => {
    const id = event.target.id;
    let mapped = taskList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setTaskList(mapped);
  }

  const handleChange = (event) => {
    setTaskInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(taskInput);
    setTaskInput('');
  }

  const addTask = (userInput) => {
    let copy = [...taskList];
    copy = [...copy, { id: taskList.length + 1, task: taskInput, complete: false }];
    setTaskList(copy);
  }

  const changeView = () => {
    taskView ? setTaskView(false) : setTaskView(true)
  }

  return (
    <div className="App">
      <Sidebar changeView={changeView} />
      <Tasks handleSubmit={handleSubmit} handleChange={handleChange} taskList={taskList} taskView={taskView} />
    </div>
  );
}

export default App;
