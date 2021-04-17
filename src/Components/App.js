import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import ListView from './TaskForm/ListView';
import TaskForm from './TaskForm/TaskForm';
import firebase from '../database';

const inputInitialState = {
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

const App = () => { 
  //Task states
  const [ taskList, setTaskList ] = useState('');
  const [ taskInput, setTaskInput ] = useState(inputInitialState);
  const [ currentTaskId, setCurrentTaskId ] = useState('');
   //UX States
   const [ userView, setUserView ] = useState(true); //Will change to some other system for more types of views, for now true is list view
  //Sidebar States
  const [ collectionList, setCollectionList ] = useState('');
  const [ collectionInput, setCollectionInput ] = useState('');
  const [ selectedCollection, setSelectedCollection] = useState('list-default');
  const [ searchInput, setSearchInput] = useState('')

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
    // Sync the data.
    ref.on('value', snapshot => {
        if (snapshot.val()){
          setCollectionList(snapshot.val());
        } 
    });
    return () => ref
  }, []);
  
  const handleToggle = (event) => {
    const id = event.target.parentElement.id;
    const regex = /(?<=list-).+/g
    const list = selectedCollection.match(regex).toString();
    dbRef.ref().child('tasks/').child(list).child(id).get().then((snapshot) => {
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

  const handleChange = (event) => {
    const materialName = event.target.name.match(/(?<=material-).+/g);
    if(event.target.name.match(/^material/)) {
      if (taskInput.materials[event.target.parentElement.id]) {
        setTaskInput({...taskInput, materials: { ...taskInput.materials, 
          [event.target.parentElement.id]: { ...taskInput.materials[event.target.parentElement.id], [materialName]: event.target.value}}})
      } else {
        setTaskInput({...taskInput, materials: { ...taskInput.materials, 
          [event.target.parentElement.id]: {[materialName]: event.target.value}}})
      }
    } else {
      const value = event.target.value;
      setTaskInput({...taskInput, [event.target.name]: value}); 
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const regex = /(?<=list-).+/g
    const id = selectedCollection.match(regex).toString();
    if  (currentTaskId) {
      dbRef.ref('tasks/' + id + '/' + currentTaskId).set(taskInput);
      setCurrentTaskId('')
      setTaskInput(inputInitialState);
    } else {
      if (taskInput.title) {
        dbRef.ref('tasks/' + id).push(taskInput);
        setCurrentTaskId('')
        setTaskInput(inputInitialState);
      }
    } 
  }
  
  const deleteTask = () => {
    if (currentTaskId) {
      const regex = /(?<=list-).+/g
      const id = selectedCollection.match(regex).toString();
      dbRef.ref().child(`tasks/${id}/${currentTaskId}`).remove()
      setCurrentTaskId('');
    } //else nothing
    setCurrentTaskId('');
    setTaskInput(inputInitialState);
  }

  const handleCollectionInput = (event) => {
    setCollectionInput(event.target.value)
  }

  const createCollection = (event) => {
    event.preventDefault();
    if (collectionInput) {
      dbRef.ref('tasks').child(collectionInput).push({'placeholder': 'for initialization'});
    setCollectionInput('');
    }
  }

  const openCollection = (event) => {
    const activeList = document.querySelector('.list-active')
    const newList = document.getElementById(event.target.id).parentElement;
    if (activeList) {
      activeList.classList.remove('list-active')
    }
    setSelectedCollection(event.target.id);
    newList.classList.add('list-active');
  }

  const deleteCollection = (event) => {
    const regex = /(?<=delete-).+/g;
    const id = event.target.id.match(regex).toString(); 
    if (id !== 'default') {
      dbRef.ref().child('tasks').child(id).remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
      setSelectedCollection('default')
    }
  }

  const handleSearchInput = (event) => setSearchInput(event.target.value);

  const generateMaterialBox = (object) => {
    setTaskInput(object)
    /* setNewMaterialBox(count => count + 1) */
    /* const materialBoxes = document.querySelectorAll('.material-container')
    console.log(Array.from(materialBoxes).length)
  /*   if (materialBoxes.length === 1) {
    } */
    /* if (materialBoxes.length[materialBoxes.length - 1][] */
   // return 'poop'
  }
 //console.log(generateMaterialBox())
  /* const selectedCollection = */

  const changeView = () => {
    if (userView) {
      setUserView(false)
    } else if (!userView && currentTaskId) {
      setCurrentTaskId('')
      setTaskInput(inputInitialState)
      setUserView(true)
    } else {
      setUserView(true)
    }
  }

  const view = () => {
    if (userView) {
      return (
        <ListView
          handleChange={handleChange} 
          handleToggle={handleToggle} 
          handleSubmit={handleSubmit}
          taskList={taskList}
          selectedCollection={selectedCollection}
          taskInput={taskInput}
          
         />
      )
    } else {
      return (
      <div
        className="task-background" >
        <TaskForm
          deleteTask={deleteTask}
          handleChange={handleChange}  
          handleSubmit={handleSubmit}
          taskInput={taskInput}
          generateMaterialBox={generateMaterialBox}
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
        handleCollectionInput={handleCollectionInput}
        collectionList={collectionList}
        openCollection={openCollection}
        deleteCollection={deleteCollection}
        collectionInput={collectionInput}
        selectedCollection={selectedCollection}
        handleSearchInput={handleSearchInput}
         />
      {view()}
    </div>
  );
}

export default App;
