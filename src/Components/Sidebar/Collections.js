import React, { useEffect } from 'react';

const Collections = ({ createCollection, handleCollectionInput, collectionList, openCollection, deleteCollection, collectionInput, selectedCollection }) => {
  useEffect(() => {
    const buttons = Array.from(document.getElementsByClassName('delete-collection'));
    buttons.forEach(button => {
      const list = button.id.split('-')[1]
      const collection = selectedCollection.split('-')[1]
      if (list === collection) {
        button.style.display = "inline";
      } else {
        button.style.display = "none";
      }
    })
    
  }, [selectedCollection]);

  const mappedCollections = 
    Object.keys(collectionList).map((key) => {
      if (key !== 'default') {
        return (
          <div className="collection" key={key}>
            <div
              id={`list-${key}`}
              className='collection-name'
              onClick={openCollection} >
              {key}
            </div>
            <button id={`delete-${key}`} 
            className="delete-collection" 
            onClick={(e) => {
              if (window.confirm('Are you sure you wish to delete this item?')) {
                return deleteCollection(e);
              }}} >
              X</button>
          </div>
        )
      }
    })
  
  return (
    <div
      className="collection-container" >
        <div className="add-collection-group">
          <input id='input-addcollection' type="text" name="collection" placeholder="New list name..." onChange={handleCollectionInput} value={collectionInput} />
          <button id='button-addcollection' name="collection" onClick={createCollection} >+</button>
        </div>
      <div className="collection" >
          <div
            id='list-default'
            className="collection-name list-active"
            onClick={openCollection} >
            Default List
          </div>
        </div>
      {mappedCollections}
    </div>
  )
}

export default Collections;