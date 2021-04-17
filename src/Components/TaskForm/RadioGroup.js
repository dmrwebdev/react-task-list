const RadioGroup = ({handlechange, groupName, description, taskInput}) => {
  return (
    <label className={`slider-${description.toLowerCase()}`}>{description}
    <div className="slider-group">
      <datalist id="slider-label-data">
        <option value="1" label="1"  ></option>
        <option value="2" label="2"></option>
        <option value="3" label="3"></option>
        <option value="4" label="4"></option>
        <option value="5" label="5"></option>
      </datalist>
      <input
        id={`${groupName}-slider`}
        name={groupName}
        list="slider-label-data"
        onChange={handlechange}
        type="range"
        min="1"
        max="5"
        value={taskInput[groupName]} />
      
    </div>
    
    </label>
  );
}

export default RadioGroup;