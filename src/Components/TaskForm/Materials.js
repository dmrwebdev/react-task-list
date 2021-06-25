import { useEffect, useState } from "react";

const Materials = ({ handleMaterial, materials }) => {
  const [numOfMaterials, setNumOfMaterials] = useState(1);
  
  useEffect(() => {
    const  keysLength = Object.keys(materials).length
      keysLength > 0
      ? setNumOfMaterials(keysLength)
      : setNumOfMaterials(1);
  }, [materials]);

  useEffect(() => {
    const keys = Array.from(Object.keys(materials))
    const lastKey = keys[keys.length - 1]
    const lastValTrue = materials[lastKey].item ? true : false;
    if(lastValTrue) {
      const newObj = { 
        ...materials,
        [`material-${numOfMaterials + 1}`]: { 'item': '', 'price': ''}
      }
      handleMaterial(newObj);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materials]);

  function handleMatItem(event) {
    const material = event.target.parentElement.getAttribute('data-material');
    let newObj = {
      ...materials,
      [ material ]: {
        ...materials[material],
        item: event.target.value
      }
    };
    handleMaterial(newObj)
  }

  function handleMatPrice(event) {
    const material = event.target.parentElement.getAttribute('data-material');
    let newObj = {
      ...materials,
      [ material ]: {
        ...materials[material],
        price: event.target.value
      }
    };
    handleMaterial(newObj)
  }

  function deleteMaterial (event) {
    const id = event.target.getAttribute('data-id');
    const object = { ...materials };
    if (Array.from(Object.keys(object)).length > 1 && materials[id].item) {
      delete object[id]
      reOrderMaterials(object, id)
    }
  }

  function reOrderMaterials (object, id) {
    let deletedId = Number(id.split('-')[1]);
    const keys = Array.from(Object.keys(object))
    let reOrdered = {}
    keys.forEach(key => {
      let keyNum = Number(key.split('-')[1])
      if (keyNum < deletedId) {
        reOrdered = { ...reOrdered, [key]: { ...object[key]} }
      } else {
        reOrdered = { ...reOrdered, [`material-${keyNum - 1}`] : {...object[key]} }
      }
    })
    handleMaterial(reOrdered)
  }

  const mappedMaterials = () => {
    const keys = Array.from(Object.keys(materials))
    const mapped = []
    // eslint-disable-next-line array-callback-return
    keys.map(key => {
      mapped.push(
        <div 
          key={key}
          className="material-container"
          data-material={key} >
        <input 
          className="material-item"
          onChange={handleMatItem}
          name="material-item"
          placeholder="Material"
          value={materials[key].item} />
        <input
          id={`${key}-price`}
          className="material-price"
          onChange={handleMatPrice}
          name="material-price"
          placeholder="Price"
          value={materials[key].price}  />
        <button 
          className="button-material-delete" 
          data-id={key} type="button" onClick={deleteMaterial}>X</button>
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
