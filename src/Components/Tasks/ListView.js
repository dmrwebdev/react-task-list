import React from 'react';

function ListView({ handleChange, handleSubmit, handleToggle, taskList, selectedCollection, taskInput }) { 
  //currently mapping in firebase order (numerical/alphabetical)
  const mappedTasks =
    Object.keys(taskList).map((list) => {
      if (`list-${list}` === selectedCollection) {
        return Object.keys(taskList[list]).map(key => {
          return (
            <div
              id={key}
              key={key}
              onClick={e => handleToggle(e)} >
              {taskList[list][key].title}
            </div>
          )
        })
      }
    })
    /*  */

  return (
    <div className="taskview-list">
      <form>
        <input id='input-quicktask' type="text" name="title" onChange={handleChange} placeholder="Title" value={taskInput.title}/>
        <button onClick={handleSubmit} type="submit">Submit</button>
      </form> 
      <div>
        {mappedTasks}
      </div>
    </div>
  );
}

export default ListView;

  /* className={task.complete ? "strike" : ""}  */