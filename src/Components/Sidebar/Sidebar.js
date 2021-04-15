import React from 'react';
import './Sidebar.css';
import Collections from './Collections'

const Sidebar = ({ changeView, createCollection, handleCollectionInput, collectionList, openCollection, deleteCollection, collectionInput }) => {
  return (
    <div className="Sidebar">
      <button onClick={changeView}>Change View</button>
      <Collections 
        collectionList={collectionList}
        createCollection={createCollection}
        handleCollectionInput={handleCollectionInput}
        openCollection={openCollection} 
        deleteCollection={deleteCollection}
        collectionInput={collectionInput} />
    </div>
  );
}

export default Sidebar;