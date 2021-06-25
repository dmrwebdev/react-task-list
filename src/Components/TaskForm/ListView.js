import { useState } from 'react';
import './ListView.css'

function ListView({ collectionList, handleChange, handleSubmit, openTask, taskList, selectedCollection, taskInput }) { 
  const [ sortOrder, setSortOrder ] = useState('default');
  const [ sortAscending, setSortAscending ] = useState(false);

  function handleSort(event) {
    let id = event.target.getAttribute('data-id')
    if(id === sortOrder) {
      setSortAscending(prev => !prev);
    } else {
      setSortAscending(false);
      setSortOrder(id);
    }
  }
  //currently mapping in firebase order (numerical/alphabetical)
  function mappedTasks() {
      if(selectedCollection === 'all-tasks') {
      return Object.keys(collectionList).map(list => {
        return Object.keys(collectionList[list]).map(key => {
          return (
            <li
                data-list={list}
                data-id={key}
                id={key}
                className="taskview-list-container"
                key={key}
                onClick={openTask} >
                <div>
                  {collectionList[list][key].title}
                </div>
                <div>
                  {collectionList[list][key].details}
                </div>
                <div>
                  {collectionList[list][key].priority}
                </div>
                <div>
                  {collectionList[list][key].difficulty}
                </div>
                <div>
                  {collectionList[list][key].reward}
                </div>
                <div>
                  {collectionList[list][key].dueDate}
                </div>
              </li>
          )
        })
      })
    }  else {
      return Object.keys(taskList).map((list) => {
        if (list === selectedCollection) {
          return Object.keys(taskList[list]).map(key => {
            return (
              <li
                data-id={key}
                id={key}
                className="taskview-list-container"
                key={key}
                onClick={openTask} >
                <div>
                  {taskList[list][key].title}
                </div>
                <div>
                  {taskList[list][key].details}
                </div>
                <div>
                  {taskList[list][key].priority}
                </div>
                <div>
                  {taskList[list][key].difficulty}
                </div>
                <div>
                  {taskList[list][key].reward}
                </div>
                <div>
                  {taskList[list][key].dueDate}
                </div>
              </li>
            )
          })
        }
      })
    }
  }  

  return (
    <div 
      className="taskview-background">
      <div className="taskview-container">
        <form>
          <input id='input-quicktask' type="text" name="title" onChange={handleChange} placeholder="Title" value={taskInput.title}/>
          <button onClick={handleSubmit} type="submit">Submit</button>
        </form> 
        <div className="taskview-list">
          <div className="taskview-list-header" >
            <div data-id='title' onClick={handleSort}>
            Title
            </div>
            <div data-id='description' onClick={handleSort}>
              Description
            </div>
            <div data-id='priority' onClick={handleSort}>
              Priority
            </div>
            <div data-id='Difficulty' onClick={handleSort}>
              Difficulty
            </div>
            <div data-id='Reward' onClick={handleSort}>
              Reward
            </div>
            <div data-id='Due Date' onClick={handleSort}>
              Due Date
            </div>
          </div>
          {mappedTasks()}
        </div>
      </div>
    </div>
  );
}

export default ListView;

  /* className={task.complete ? "strike" : ""}  */