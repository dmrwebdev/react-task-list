import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import ListView from './TaskForm/ListView';
import TaskForm from './TaskForm/TaskForm';
import firebase from '../database';

const App = () => { 
  const initialState = {
    "title": "",
    "details": "",
    "dueDate": "",
    "priority": "",
    "difficulty": "",
    "reward": "",
    'materials': {
      "material-1": {
        'item': "",
        'price': ""
      }
    }
  }
  //Task states
  const [ taskList, setTaskList ] = useState('');
  const [ taskInput, setTaskInput ] = useState(initialState);
  const [ currentTaskId, setCurrentTaskId ] = useState('');
   //UX States
   const [ userView, setUserView ] = useState(true); //Will change to some other system for more types of views, for now true is list view
  //Sidebar States
  const [ collectionList, setCollectionList ] = useState('');
  const [ selectedCollection, setSelectedCollection] = useState('all-tasks');
  
  const dbRef = firebase.database();
  // Lifecycle hook for firebase.
  useEffect(() => {
    let ref = dbRef.ref('tasks');
    // Sync the data.
    ref.on('value', snapshot => {
        if (snapshot.val()){
          setTaskList(snapshot.val());
        } 
    });
    return () => ref
  }, []);

  useEffect(() => {
    let ref = dbRef.ref('tasks');
    ref.on('value', snapshot => {
        if (snapshot.val()){
          setCollectionList(snapshot.val());
        } 
    });
    return () => ref
  }, []);

  

  function handleChange(event) {
    const value = event.target.value;
    setTaskInput({...taskInput, [event.target.name]: value}); 
  }

  function handleMaterial(object) { setTaskInput({...taskInput, materials: { ...object }}) }
  
  const openTask = (event) => {
    const id = event.target.parentElement.getAttribute('data-id');
    const list = event.target.parentElement.getAttribute('data-list');
    if(selectedCollection === 'all-tasks') {
      dbRef.ref().child('tasks/').child(list).child(id).get().then(snapshot => {
        if (snapshot.exists()) {
          setCurrentTaskId(id);
          setTaskInput(snapshot.val());
          setUserView(false)
        } else {
          console.log("No data available");
        }
      })
    } else {
      dbRef.ref().child('tasks/').child(selectedCollection).child(id).get().then((snapshot) => {
      if (snapshot.exists()) {
        setCurrentTaskId(id);
        setTaskInput(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    setUserView(false)
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(currentTaskId) {
      dbRef.ref('tasks/' + selectedCollection + '/' + currentTaskId).set(taskInput);
      setCurrentTaskId('');
      setTaskInput(initialState);
    } else {
      if (taskInput.title) {
        dbRef.ref('tasks/' + selectedCollection).push(taskInput);
        setCurrentTaskId('')
        setTaskInput(initialState);
      }
    }
  }
  
  const deleteTask = () => {
    if (currentTaskId) {
      dbRef.ref().child(`tasks/${selectedCollection}/${currentTaskId}`).remove()
      setCurrentTaskId('');
    } //else nothing
    setCurrentTaskId('');
    setTaskInput(initialState);
  }

  function createCollection(string) {
    dbRef.ref('tasks').child(string).push({'placeholder': 'for initialization'});
  }    

  const openCollection = (event) => {
    const id = event.target.getAttribute('data-id')
    const activeList = document.querySelector('.list-active')
    const newList = event.target.parentElement;
    if (activeList) {
      activeList.classList.remove('list-active')
    }
    setSelectedCollection(id);
    newList.classList.add('list-active');
  }

  const deleteCollection = (event) => {
    const id = event.target.getAttribute('data-id'); 
    console.log(id)
    if (id !== 'all-tasks') {
      dbRef.ref().child('tasks').child(id).remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
      setSelectedCollection('all-tasks')
    }
  }

  const filteredResults = Array.from(Object.entries(taskList)).filter(result => result.includes("AAA"));

  const changeView = () => {
    if (userView) {
      setUserView(false)
    } else if (!userView && currentTaskId) {
      setCurrentTaskId('')
      setTaskInput(initialState)
      setUserView(true)
    } else {
      setUserView(true)
    }
  }

  const view = () => {
    if (userView) {
      return (
        <ListView
          openTask={openTask} 
          handleSubmit={handleSubmit}
          taskList={taskList}
          selectedCollection={selectedCollection}
          taskInput={taskInput}
          collectionList={collectionList}
         />
      )
    } else {
      return (
      <div
        className="task-background" >
        <TaskForm
          deleteTask={deleteTask}
          handleChange={handleChange}
          handleMaterial={handleMaterial}
          handleSubmit={handleSubmit}
          taskInput={taskInput}
          userView={userView}
          currentTaskId={currentTaskId}
        />
      </div>
      )
    }
  }  

  return (
    <div className="App">
      <Sidebar 
        changeView={changeView} 
        createCollection={createCollection}
        collectionList={collectionList}
        openCollection={openCollection}
        deleteCollection={deleteCollection}
        selectedCollection={selectedCollection}
         />
      {view()}
    </div>
  );
}

export default App;
