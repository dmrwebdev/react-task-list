const RadioGroup = ({handleChange, groupName, radioVals, description}) => {

  const radioMaker = () => {
    return radioVals.map(val => (
    <label 
      htmlFor={`radio-${groupName}-${val}`}
      key={`${groupName}-${val}`} >{val}
      <input
        id={`radio-${groupName}-${val}`}
        name={groupName}
        onChange={handleChange}
        type="radio"
        value={val} />
    </label>
  ))
  }

  return (
    <p className={`radio-${description.toLowerCase()}`}>{description}
    {radioMaker()}
    </p>
  );
}

export default RadioGroup;