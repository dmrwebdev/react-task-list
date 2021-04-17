import { useEffect, useState } from "react";

const Materials = ({ handleChange, taskInput, generateMaterialBox }) => {
  const [numOfMaterials, setNumOfMaterials] = useState(1)

  useEffect(() => {
    const  keysLength= Object.keys(taskInput.materials).length
      keysLength > 0
      ? setNumOfMaterials(keysLength)
      : setNumOfMaterials(1);
  }, [taskInput.materials]);

  useEffect(() => {
    const keys = Array.from(Object.keys(taskInput.materials))
    const lastKey = keys[keys.length - 1]
    const lastValBlank = taskInput.materials[lastKey].item ? true : false;
    if(lastValBlank) {
      const object = { ...taskInput, materials: {
          ...taskInput.materials, 
          [`material-${numOfMaterials + 1}`]: { 'item': '', 'price': ''}
        }
      }
      generateMaterialBox(object);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskInput.materials]);
  
  

  const deleteMaterial = (event) => {
    const regex = /(?<=delete-).+/g;
    const id = event.target.id.match(regex).toString();
    const object = { ...taskInput };
    if (Array.from(Object.keys(object.materials)).length > 1) {
      delete object.materials[id]
      reOrderMaterials(id)
    }
  }

  const reOrderMaterials = (id) => {
    let deletedId = Number(id.split('-')[1]);
    let reOrdered = {}
    const keys = Array.from(Object.keys(taskInput.materials))
    keys.forEach(key => {
      let keyNum = Number(key.split('-')[1])
      if (keyNum < deletedId) {
        reOrdered = { ...taskInput, materials: { ...reOrdered.materials, [key]: { ...taskInput.materials[key]}} }
      } else {
        reOrdered = { ...taskInput, materials: { ...reOrdered.materials, [`material-${keyNum - 1}`] : {...taskInput.materials[key]}}}
      }
    })
    generateMaterialBox(reOrdered)
  }


    
  const mappedMaterials = () => {
    const keys = Array.from(Object.keys(taskInput.materials))
    const mapped = []
    // eslint-disable-next-line array-callback-return
    keys.map(key => {
        mapped.push(
          <div 
          id={key}
          key={key}
          className="material-container" >
          <input 
            id={`${key}-item`}
            className="material-item"
            onChange={handleChange}
            name="material-item"
            placeholder="Material"
            value={taskInput.materials[key].item} />
          <input
            id={`${key}-price`}
            className="material-price"
            onChange={handleChange}
            name="material-price"
            placeholder="Price"
            value={taskInput.materials[key].price}  />
          <button 
            className="button-material-delete" 
            id={`delete-${key}`} type="button" onClick={deleteMaterial}>X</button>
        </div>
        )
      })
      return (
        <div>
        {mapped}
        </div>
      )
    }

    return(
      <div className="task-materials">
        <div className="materials-header">
          <p>Materials</p>
        </div>
        <div className="materials-list">
          {mappedMaterials()}
        </div>
      </div>
    )
  }

  export default Materials
