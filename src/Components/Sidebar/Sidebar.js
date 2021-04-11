import React from 'react';
import './Sidebar.css';

const Sidebar = ({changeView}) => {
  return (
    <div className="Sidebar">
      <button onClick={changeView}>Change View</button>
    </div>
  );
}

export default Sidebar;