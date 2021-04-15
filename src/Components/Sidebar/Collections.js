import React from 'react';

const Collections = ({ createCollection, handleCollectionInput, collectionList, openCollection, deleteCollection, collectionInput }) => {
   
  const mappedCollections = 
    Object.keys(collectionList).map((key) => {
      if (key !== 'default') {
        return (
          <div className="list" key={key}>
            <div
              id={`list-${key}`}
              onClick={openCollection} >
              {key}
            </div>
            <button id={`delete-${key}`} 
            className="button-list-delete" 
            onClick={(e) => {
              if (window.confirm('Are you sure you wish to delete this item?')) {
                return deleteCollection(e);
              }}} >
              Delete List</button>
          </div>
        )
      }
    })
  
  return (
    <div
      className="list" >
      <input id='input-addcollection' type="text" name="collection" placeholder="New list name..." onChange={handleCollectionInput} value={collectionInput}/>
      <button name="collection" onClick={createCollection} >New Collection</button>
      <div className="list list-active" >
          <div
            id='list-default'
            onClick={openCollection} >
            Default List
          </div>
        </div>
      {mappedCollections}
    </div>
  )
}

export default Collections;