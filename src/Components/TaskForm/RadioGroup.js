const RadioGroup = ({handlechange, groupName, radioVals, description}) => {

  const radioMaker = () => {
    return radioVals.map(val => (
    <label 
      htmlFor={`radio-${groupName}-${val}`}
      key={`${groupName}-${val}`} >{val}
      <input
        id={`radio-${groupName}-${val}`}
        name={groupName}
        onChange={handlechange}
        type="radio"
        value={val} />
    </label>
  ))
  }

  return (
    <label className={`radio-${description.toLowerCase()}`}>{description}
    <div className="radio-group">
      {radioMaker()}
    </div>
    
    </label>
  );
}

export default RadioGroup;