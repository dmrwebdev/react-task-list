import React from 'react';

function List({task, handleToggle}) { 
  return (
    <div id={task.id} className={task.complete ? "strike" : ""} onClick={e => handleToggle(e)}>
      {task.task}
    </div>
    

  );
}

export default List;