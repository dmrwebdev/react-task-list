import React from 'react';

const Collections = ({ createCollection, handleCollectionInput, collectionList, openCollection, deleteCollection, collectionInput }) => {
   
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
              Delete List</button>
          </div>
        )
      }
    })
  
  return (
    <div
      className="collection-container" >
      <input id='input-addcollection' type="text" name="collection" placeholder="New list name..." onChange={handleCollectionInput} value={collectionInput}/>
      <button id='button-addcollection' name="collection" onClick={createCollection} >New Collection</button>
      <div className="collection list-active" >
          <div
            id='default-collection'
            className="collection"
            onClick={openCollection} >
            Default List
          </div>
        </div>
      {mappedCollections}
    </div>
  )
}

export default Collections;