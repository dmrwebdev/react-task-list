import './Tasks.css';
import RadioGroup from './RadioGroup'
import Materials from './Materials'

function TaskForm({ currentTaskId, handleChange, handleMaterial, handleSubmit, deleteTask, taskInput }) { 

  return (
    <form className="TaskForm" onSubmit={handleSubmit} >
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
            value={taskInput.dueDate/*  || '' */} />
        </label>
        <RadioGroup
          taskInput={taskInput}
          description="Priority"
          groupName="priority"
          handlechange={handleChange} />
        <RadioGroup
          taskInput={taskInput}
          description="Difficulty"
          handlechange={handleChange}
          groupName="difficulty" />
        <RadioGroup
          taskInput={taskInput}
          description="Reward"
          handlechange={handleChange}
          groupName="reward" />
      </div>
      <Materials
        materials={taskInput.materials}
        handleMaterial={handleMaterial}
        currentTaskId={currentTaskId} />
      <div className="task-controls" >
        <button className="task-submit" type="submit">Submit</button>
        <button className="task-delete" onClick={deleteTask} type="button">Delete</button>
      </div>
    </form>
  );
}

export default TaskForm;