import React from 'react';
import Task from './Task'

function List({taskList, handleToggle}) { 
  const mappedList = taskList.map(task => {
    return (
      <Task task={task} handleToggle={handleToggle} />
    )
  })
  return (
    <div>
      {mappedList}
    </div>
    

  );
}

export default List;