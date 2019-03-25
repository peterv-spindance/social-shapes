import React from 'react'

const Shape = ({ onClick, sides, color, isSyncing }) => (
  <li
    style={{
      color: color,
      backgroundColor: isSyncing ? 'lightgray' : 'white' 
    }}
  >
    <div>Sides: {sides}</div>
    <div>
      <button onClick={onClick}>Remove</button>
    </div>
  </li>
)

export default Shape