import { useEffect, useState } from "react";

const Materials = ({ handleChange, taskInput, generateMaterialBox }) => {
  const [numOfMaterials, setNumOfMaterials] = useState(1)
  useEffect(() => {
    const  keysLength= Object.keys(taskInput.materials).length
      keysLength > 0
      ? setNumOfMaterials(keysLength)
      : setNumOfMaterials(1);
  }, [taskInput.materials]);
  
  const addContainer = () => {
      const object = { ...taskInput, materials: {
          ...taskInput.materials, 
          [`material-${numOfMaterials + 1}`]: { 'item': '', 'price': ''}
        }
      }
      generateMaterialBox(object);
    }

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
    keys.map(key => {
      let keyNum = Number(key.split('-')[1])
      if (keyNum < deletedId) {
        reOrdered = { ...taskInput, materials: { ...reOrdered.materials, [key]: { ...taskInput.materials[key]}} }
      } else {
        reOrdered = { ...reOrdered, materials: { ...reOrdered.materials, [`material-${keyNum - 1}`] : {...taskInput.materials[key]}}}
        
      }
    })
    generateMaterialBox(reOrdered)
  }
    
    const mappedMaterials = () => {
      const keys = Array.from(Object.keys(taskInput.materials))
      return keys.map(key => {
        return (
          <div 
          id={key}
          key={key}
          className="material-container" >
          <input 
            id={`${key}-item`}
            onChange={handleChange}
            name="material-item"
            placeholder="Material"
            value={taskInput.materials[key].item} />
          <input
            id={`${key}-price`}
            onChange={handleChange}
            name="material-price"
            placeholder="Price"
            value={taskInput.materials[key].price}  />
          <button 
            className="button-material-delete" 
            id={`delete-${key}`} type="button" onClick={deleteMaterial}>Delete</button>
        </div>
        )
      })
    }

    return(
      <div className="task-materials">
        <p>Materials</p>
        <button type="button" onClick={addContainer}>+</button>
        {mappedMaterials()}
      </div>
    )
  }

  export default Materials
