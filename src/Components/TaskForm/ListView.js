import './ListView.css'

function ListView({ handleChange, handleSubmit, handleToggle, taskList, selectedCollection, taskInput }) { 
  //currently mapping in firebase order (numerical/alphabetical)
  const mappedTasks =
    Object.keys(taskList).map((list) => {
      if (`list-${list}` === selectedCollection) {
        return Object.keys(taskList[list]).map(key => {
          return (
            <li
              id={key}
              className="taskview-list-container"
              key={key}
              onClick={handleToggle} >
              <div>
                {taskList[list][key].title}
              </div>
              <div>
                {taskList[list][key].description}
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
    /*  */

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
              <div>
                Title
              </div>
              <div>
                Description
              </div>
              <div>
                Priority
              </div>
              <div>
                Difficulty
              </div>
              <div>
                Reward
              </div>
              <div>
                Due Date
              </div>
            </div>
          {mappedTasks}
          </div>
      <div> 
       
      </div>
    </div>
    </div>
  );
}

export default ListView;

  /* className={task.complete ? "strike" : ""}  */