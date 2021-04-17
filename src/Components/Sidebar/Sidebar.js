import React from 'react';
import './Sidebar.css';
import Collections from './Collections'


const Sidebar = ({ changeView, createCollection, handleCollectionInput, collectionList, openCollection, deleteCollection, collectionInput, selectedCollection, handleSearchInput, searchInput }) => {
  return (
    <div className="Sidebar">
      <div className="search">
        <input
          id="searchbar" 
          placeholder="Search tasks..."
          onChange={handleSearchInput}
          value={searchInput} />
      </div>
      <button 
          id="change-view"
          onClick={changeView}>Change View</button>
      <Collections 
        collectionList={collectionList}
        createCollection={createCollection}
        handleCollectionInput={handleCollectionInput}
        openCollection={openCollection} 
        deleteCollection={deleteCollection}
        collectionInput={collectionInput}
        selectedCollection={selectedCollection} />
    </div>
  );
}

export default Sidebar;