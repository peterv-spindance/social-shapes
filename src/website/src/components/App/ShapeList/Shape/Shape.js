import React from 'react'

const Shape = ({ onClick, sides, color }) => (
  <li
    style={{
      color: color
    }}
  >
    <div>Sides: {sides}</div>
    <div>
      <button onClick={onClick}>Remove</button>
    </div>
  </li>
)

export default Shape