import React, { useState, useEffect } from 'react';

const Collections = ({ createCollection, collectionList, openCollection, deleteCollection, selectedCollection }) => {
  const [ collectionInput, setCollectionInput ] = useState('');

  useEffect(() => {
    const buttons = Array.from(document.getElementsByClassName('delete-collection'));
    buttons.forEach(button => {
      const list = button.getAttribute('data-id');
      if (list === selectedCollection) {
        button.style.display = "inline";
      } else {
        button.style.display = "none";
      }
    })
  }, [selectedCollection]);

  function handleCollectionInput(event) {
    setCollectionInput(event.target.value)
  }

  function handleCreateCollection() {
    if(collectionInput) {
      createCollection(collectionInput);
      setCollectionInput('');
    }
  }

  const mappedCollections = 
    // eslint-disable-next-line array-callback-return
    Object.keys(collectionList).map((key) => {
      if (key !== 'all-tasks') {
        return (
          <div className="collection" key={key}>
            <div
              data-id={key}
              className='collection-name'
              onClick={openCollection} >
              {key}
            </div>
            <button 
              data-id={key}
              className="delete-collection" 
              onClick={(e) => {
                if (window.confirm('Are you sure you wish to delete this item?')) {
                  return deleteCollection(e);
                }}} > 
                X
            </button>
          </div>
        )
      }
    })

  
    

  return (
    <div
      className="collection-container" >
        <div className="add-collection-group">
          <input id='input-addcollection' type="text" name="collection" placeholder="New list name..." onChange={handleCollectionInput} value={collectionInput} />
          <button id='button-addcollection' name="collection" onClick={handleCreateCollection} >+</button>
        </div>
      <div className="collection" >
          <div
            data-id='all-tasks'
            className="collection-name list-active"
            onClick={openCollection} >
            All Tasks
          </div>
        </div>
      {mappedCollections}
    </div>
  )
}

export default Collections;